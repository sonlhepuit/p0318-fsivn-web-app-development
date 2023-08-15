import { dateFormat } from '../../utils/constants';
import moment from 'moment';

export const convertDate = (dateString, dateformat) => {
  const formatString = dateformat;
  return moment(dateString, formatString);
};
export const handleChatData = (chatRes) => {
  if (!chatRes) return;
  const getTurnAndRole = (str) => {
    const pattern = /^(\d+)([a-zA-Z]+)$/;
    const match = str.match(pattern);
    return match ? { turn: match[1], role: match[2] } : {};
  };

  const parseReadableChatObj = (rawChatObj) => {
    let result = {};
    Object.entries(rawChatObj).forEach(([key, val]) => {
      let { role } = getTurnAndRole(key);
      result[role] =
        role === 'time' ? convertDate(val, dateFormat.messageDate) : val;
    });
    return result;
  };

  let arr = Array(10)
    .fill()
    .map((_, i) => i + 1);
  let result = {};
  arr.forEach((el) => {
    Object.entries(chatRes).forEach(([key, val]) => {
      let { turn } = getTurnAndRole(key);

      if (el === +turn) {
        if (result[turn]) result[turn] = { ...result[turn], [key]: val };
        else result = { ...result, [turn]: { [key]: val } };
      }
    });
  });

  const normalizeData = (rawChat) => {
    if (!rawChat?.length) return [];
    let result = [];
    rawChat.forEach((el) => {
      result.push({ role: 'user', content: el.user, time: el.time });
      result.push({ role: 'assistant', content: el.bot, time: el.time });
    });
    return result;
  };

  const sortChat = (initChat = {}) => {
    let tempArr = Object.values(initChat).map((val) => val);
    tempArr.sort((a, b) => {
      let { turn: turnA } = getTurnAndRole(Object.keys(a)[0]);
      let { turn: turnB } = getTurnAndRole(Object.keys(b)[0]);
      let tempObjA = parseReadableChatObj(a);
      let tempObjB = parseReadableChatObj(b);
      if (moment(tempObjA.time).isBefore(moment(tempObjB.time))) {
        return -1;
      }
      if (moment(tempObjA.time).isSame(moment(tempObjB.time))) {
        if (turnA > chatRes.count && turnB < chatRes.count) {
          return -1;
        }
      }
      return 1;
    });
    return normalizeData(tempArr.map((el) => parseReadableChatObj(el)));
  };

  return {
    count: chatRes.count,
    title: chatRes.title,
    chatList: sortChat(result)
  };
};

export const checkIsSameDate = (curDate, prevDate) => {
  if (!prevDate) return;
  if (curDate?.isSame(prevDate, 'date')) return true;
  return false;
};
