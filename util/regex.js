/*
 * @Description: regexp tool
 * @Author: liupeng
 * @Date: 2020-03-20 17:22:55
 * @LastEditTime: 2020-03-23 11:45:55
 * @LastEditors: liupeng
 */

;(function(name, definition) {
  // 检测上下文环境是否为AMD或CMD
  var hasDefine = typeof define === 'function'
  // 检测上下文环境是否为Node
  var hasExports = typeof module !== 'function' && module.exports
  if (hasDefine) {
    // AMD环境或CMD环境
    define(definition)
  } else if (hasExports) {
    // 定义为普通Node模块
    module.exports = definition()
  } else {
    // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
    this[name] = definition()
  }
})('$PregExp', function() {
  /**
   * 不包含字母
   * @param { string } value
   */
  const isNoWord = value => /^[^A-Za-z]*$/g.test(value)
  /**
   * 只包含中文和数字
   * @param { string } value
   */
  const isCHNAndEN = value =>
    /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(
      value
    )
  /**
   * 中国邮编
   * @param { string } value
   */
  const isPostcode = value => /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value)

  /**
   * 微信号
   * @param { string } value
   */
  const isWeChatNum = value => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value)
  /**
   * 16进制颜色
   * @param { string } value
   */
  const isColor16 = value => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value)
  /**
   * 火车车次
   * @param { string } value
   */
  const isTrainNum = value => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value)
  /**
   * 手机IMEI
   *  @param { string } value
   */
  const isIMEI = value => /^\d{15,17}$/g.test(value)

  /**
   * 网址
   *  @param { string } value
   */
  const isRightWebsite = value => /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value)
  /**
   * 带端口号网址
   * @param { string } value
   */
  const isHttpAndPort = value => /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value)
  /**
   * 社会信用代码
   *  @param { string } value
   */
  const isCreditCode = value => /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(value)
  /**
   * 验证迅雷链接
   *  @param { string } value
   */
  const isThunderLink = value => /^thunderx?:\/\/[a-zA-Z\d]+=$/g.test(value)
  /**
   * 验证ed2k链接(宽松匹配)
   *  @param { string } value
   */
  const ised2k = value => /^ed2k:\/\/\|file\|.+\|\/$/g.test(value)
  /**
   * 验证磁力链接(宽松匹配)
   *  @param { string } value
   */
  const isMagnet = value => /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/g.test(value)
  /**
   * 验证子网掩码
   *  @param { string } value
   */
  const isSubnetMask = value => /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/g.test(value)

  /**
   * 验证linux"文件夹"路径
   *  @param { string } value
   */
  const isLinuxFolderPath = value => /^(\/[^/]+)+\/?$/g.test(value)
  /**
   * 验证linux"文件"路径
   *  @param { string } value
   */
  const isLinuxFilePath = value => /^(\/[^/]+)+$/g.test(value)
  /**
   * 验证window下"文件"路径
   *  @param { string } value
   */
  const isWindowsFilePath = value => /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/g.test(value)
  /**
   * 验证股票代码(A股)
   *  @param { string } value
   */
  const isAShare = value => /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/g.test(value)
  /**
   * 验证版本号格式必须为X.Y.Z
   *  @param { string } value
   */
  const isVersion = value => /^\d+(?:\.\d+){2}$/g.test(value)
  /**
   * 验证视频链接地址（视频格式可按需增删）
   *  @param { string } value
   */
  const isVideoUrl = value => /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i.test(value)
  /**
   * 验证图片链接地址（图片格式可按需增删）
   *  @param { string } value
   */
  const isImageUrl = value => /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value)
  /**
   * 验证银行卡号（10到30位, 覆盖对公/私账户）
   * @param { string } value
   */
  const isAccountNumber = value => /^[1-9]\d{9,29}$/g.test(value)
  /**
   * 验证中文姓名
   * @param { string } value
   */
  const isChineseName = value => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value)
  /**
   * 验证英文姓名
   * @param { string } value
   */
  const isEnglishName = value => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value)
  /**
   * 验证车牌号(新能源)
   * @param { string } value
   */
  const isLicensePlateNumberNER = value => /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(value)
  /**
   * 验证车牌号(非新能源)
   * @param { string } value
   */
  const isLicensePlateNumberNNER = value => /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(value)
  /**
   * 验证车牌号(新能源+非新能源)
   * @param { string } value
   */
  const isLicensePlateNumber = value =>
    /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(
      value
    )
  /**
   * 验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
   * @param { string } value
   */
  const isMPStrict = value => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value)
  /**
   * 验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
   * @param { string } value
   */
  const isMPRelaxed = value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value)
  /**
   * 验证email(邮箱)
   * @param { string } value
   */
  const isEmail = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(value)

  /**
   * 验证座机电话(国内),如: 0341-86091234
   * @param { string } value
   */
  const isLandlineTelephone = value => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value)

  /**
   * 验证身份证号(1代,15位数字)
   * @param { string } value
   */
  const isIDCardOld = value => /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g.test(value)
  /**
   * 验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
   * @param { string } value
   */
  const isIDCardNew = value => /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(value)
  /**
   * 验证身份证号, 支持1/2代(15位/18位数字)
   * @param { string } value
   */
  const isIDCard = value => /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(value)
  /**
   * 验证护照（包含香港、澳门）
   * @param { string } value
   */
  const isPassport = value => /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value)
  /**
   * 验证帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
   * @param { string } value
   */
  const isWebAccount = value => /^[a-zA-Z]\w{4,15}$/g.test(value)
  /**
   * 验证中文/汉字
   * @param { string } value
   */
  const isChineseCharacter = value =>
    /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(
      value
    )
  /**
   * 验证小数
   * @param { string } value
   */
  const isDecimal = value => /^\d+\.\d+$/g.test(value)
  /**
   * 验证数字
   * @param { string } value
   */
  const isNumber = value => /^\d{1,}$/g.test(value)
  /**
   * 验证qq号格式
   * @param { string } value
   */
  const isQQNum = value => /^[1-9][0-9]{4,10}$/g.test(value)
  /**
   * 验证数字和字母组成
   * @param { string } value
   */
  const isNumAndStr = value => /^[A-Za-z0-9]+$/g.test(value)
  /**
   * 验证英文字母
   * @param { string } value
   */
  const isEnglish = value => /^[a-zA-Z]+$/g.test(value)
  /**
   * 验证大写英文字母
   * @param { string } value
   */
  const isCapital = value => /^[A-Z]+$/g.test(value)
  /**
   * 验证小写英文字母
   * @param { string } value
   */
  const isLowercase = value => /^[a-z]+$/g.test(value)

  var PregExp = {
    isNoWord: isNoWord,
    isCHNAndEN: isCHNAndEN,
    isPostcode: isPostcode,
    isWeChatNum: isWeChatNum,
    isColor16: isColor16,
    isTrainNum: isTrainNum,
    isIMEI: isIMEI,
    isRightWebsite: isRightWebsite,
    isHttpAndPort: isHttpAndPort,
    isCreditCode: isCreditCode,
    isThunderLink: isThunderLink,
    ised2k: ised2k,
    isMagnet: isMagnet,
    isSubnetMask: isSubnetMask,
    isLinuxFolderPath: isLinuxFolderPath,
    isLinuxFilePath: isLinuxFilePath,
    isWindowsFilePath: isWindowsFilePath,
    isAShare: isAShare,
    isVersion: isVersion,
    isVideoUrl: isVideoUrl,
    isImageUrl: isImageUrl,
    isAccountNumber: isAccountNumber,
    isChineseName: isChineseName,
    isEnglishName: isEnglishName,
    isLicensePlateNumberNER: isLicensePlateNumberNER,
    isLicensePlateNumberNNER: isLicensePlateNumberNNER,
    isLicensePlateNumber: isLicensePlateNumber,
    isMPStrict: isMPStrict,
    isMPRelaxed: isMPRelaxed,
    isEmail: isEmail,
    isLandlineTelephone: isLandlineTelephone,
    isIDCardOld: isIDCardOld,
    isIDCardNew: isIDCardNew,
    isIDCard: isIDCard,
    isPassport: isPassport,
    isWebAccount: isWebAccount,
    isChineseCharacter: isChineseCharacter,
    isDecimal: isDecimal,
    isNumber: isNumber,
    isQQNum: isQQNum,
    isNumAndStr: isNumAndStr,
    isEnglish: isEnglish,
    isCapital: isCapital,
    isLowercase: isLowercase
  }
  return PregExp
})
