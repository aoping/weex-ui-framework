import constants from 'constants/constants'

export const apiGatewayHost = constants.apiGatewayHost

export const flight = {
  getHotCitys: `${apiGatewayHost}/api-data-service/data/find-hot`,
  getHotFlights: `${apiGatewayHost}/api-data-service/data/find-airport`,
  findNearest: `${apiGatewayHost}/api-data-service/data/find-nearest`,
  findLangAirport: `${apiGatewayHost}/api-data-service/find-lang-airport`,
  createSession: `${apiGatewayHost}/api-flight-polling-data-hub/create-session`,
  separatedPolling: `${apiGatewayHost}/api-flight-polling-data-hub/separatedPolling`,
  singlePolling: `${apiGatewayHost}/api-flight-polling-data-hub/singlePolling`,
  singlePollingByFuk: `${apiGatewayHost}/api-flight-polling-data-hub/singleByFuk`,
  findFlightsPrice: `${apiGatewayHost}/api-flight-polling-data-hub/find-flights-price`,
  getSliderContent: `${apiGatewayHost}/api-cms/hybrid-app/v1/home-banner`
}

export const booking = {
  findSinglePrice: `${apiGatewayHost}/api-flight-polling-data-hub/find-single-price`,
  createOrder: `${apiGatewayHost}/api-combo-selling-public/booking/createOrder`,
  topay: `${apiGatewayHost}/api-meta-booker/order/topay`,
  generateForm: `${apiGatewayHost}/api-combo-selling/generateForm`,
  verifyPrice: `${apiGatewayHost}/api-combo-selling/priceVerification`,
  // verifyContact: function(guid) {
  //   return `${apiGatewayHost}/api-member/api/member/${guid}/verifyContact`
  // },
  getContacts: function(guid) {
    return `${apiGatewayHost}/api-member/api/member/${guid}/contacts`
  },
  addContact: function(guid) {
    return `${apiGatewayHost}/api-member/api/member/${guid}/contact`
  },
  getContact: function(guid, contactid) {
    return `${apiGatewayHost}/api-member/api/member/${guid}/contact/${contactid}`
  },
  setPrimaryContact: function(guid, contactid) {
    return `${apiGatewayHost}/api-member/api/member/${guid}/contact/${contactid}/primary`
  },
  cancelPrimaryContact: function(guid, contactid) {
    return `${apiGatewayHost}/api-member/api/member/${guid}/contact/${contactid}/cancel`
  },
  deleteContact: function(guid, contactid) {
    return `${apiGatewayHost}/api-member/api/member/${guid}/contact/${contactid}`
  },
  // getTravelers: function(guid) {
  //   return `${apiGatewayHost}/api-member/api/member/${guid}/travellers`
  // },
  // addTraveller: function(guid) {
  //   return `${apiGatewayHost}/api-member/api/member/${guid}/traveller`
  // },
  // getTraveler: function(guid, passengerId) {
  //   return `${apiGatewayHost}/api-member/api/member/${guid}/traveller/${passengerId}`
  // },
  // verifyPassenger: function(guid) {
  //   return `${apiGatewayHost}/api-member/api/member/${guid}/verifyPassenger`
  // },
  // deleteTraveller: function(guid, passengerId) {
  //   return `${apiGatewayHost}/api-member/api/member/${guid}/traveller/${passengerId}`
  // },
  verifyContact: function(guid) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/verifyContact`
  },
  savePassenger: function(guid) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger`
  },
  getPassenger: function(guid, passengerId) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger/${passengerId}`
  },
  setPrimaryPassenger: function(guid, passengerId) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger/${passengerId}/primary`
  },
  cancelPrimaryPassenger: function(guid, passengerId) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger/${passengerId}/cancel`
  },
  getAllPassenger: function(guid) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passengers`
  },
  getPrimaryPassengerInAll: function(guid) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passengers/primary`
  },
  deletePassenger: function(guid, passengerId) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger/${passengerId}`
  },
  saveCredential: function(guid, passengerId) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger/${passengerId}/credential`
  },
  getAllCredential: function(guid, passengerId) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger/${passengerId}/credentials`
  },
  getCredential: function(guid, passengerId, credentialId) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger/${passengerId}/credential/${credentialId}`
  },
  deleteCredential: function(guid, passengerId, credentialId) {
    return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/passenger/${passengerId}/credential/${credentialId}`
  },
  getListCoupons: function() {
    return `${apiGatewayHost}/api-combo-selling-public/booking/listCoupons`
  },
  listAllCoupon: function() {
    return `${apiGatewayHost}/api-coupon-system/member/list`
  },
}

export const member = {
  mobileAuthenticate(data) { return `${apiGatewayHost}/api-appapi/v1/mobile/authenticate/code?mobile=${data.phone}&isBooking=true&lang=${data.lang}` },
  mobileVerifyAuthenticatePost: `${apiGatewayHost}/api-appapi/v1/mobile/authenticate/code/verify`,
  authenticatePost: `${apiGatewayHost}/api-appapi/v1/authenticate/basic`,
  thirdPartyLogin(data) { return `${apiGatewayHost}/api-appapi/thirdParty/${data.type}/signin` },
  sendRegCodeByPhone(data) { return `${apiGatewayHost}/api-appapi/v1/signup/mobile/verifycode?mobile=${data.phone}&lang=${data.lang}` },
  sendRegCodeByEmail(data) { return `${apiGatewayHost}/api-appapi/v1/signup/email/verifycode?email=${data.email}&lang=${data.lang}` },
  verifyRegCodeByPhone: `${apiGatewayHost}/api-appapi/v1/signup/mobile/validate`,
  resetPwdByMobile: `${apiGatewayHost}/api-appapi/v1/mobile/resetPassword`,
  resetPwdByEmail: `${apiGatewayHost}/api-appapi/v1/email/resetPassword`,
  sendResetCode(data) { return `${apiGatewayHost}/api-appapi/v1/resetpassword/code?accountName=${data.account}&lang=${data.lang}` },
  verifyResetCode(data) { return `${apiGatewayHost}/api-appapi/v1/resetpassword/code/verify?accountName=${data.account}&code=${data.code}` },
  getBasicMemberInfo(guid) { return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/info` },
  updateProfile(guid) { return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/updateProfile` },
  changePassword(guid) { return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/changePassword` },
  sendGeneralCode(data) { return `${apiGatewayHost}/api-appapi/generalverify?guid=${data.guid}&mobile=${data.mobile}&lang=${data.lang}` },
  generalVerifyCode(data) { return `${apiGatewayHost}/api-appapi/generalverifycode?accountName=${data.account}&code=${data.code}` },
  updateAccount: `${apiGatewayHost}/api-appapi/profile`,
  setNewPassword(guid) { return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/setNewPassword` },
  getMemberCoupons: `${apiGatewayHost}/api-coupon-system/member/list`,
  refreshToken: `${apiGatewayHost}/api-appapi/v1/refreshtoken`,
  uploadImg(guid) { return `${apiGatewayHost}/api-appapi/avatar/${guid}/upload` }
  // uploadImg(guid) { return `${apiGatewayHost}/api-member-service-auth/api/v1/member/${guid}/uploadAvatar` },
}

export const order = {
  getOrderList: `${apiGatewayHost}/api-meta-booker/order/orderList`,
  getOrderDetails: `${apiGatewayHost}/api-meta-booker/order/orderDetail`,
  getchangeTicketInfo: `${apiGatewayHost}/api-flight-change-service/change/orderChangeDetail`,
  cancleFhangeTicket: `${apiGatewayHost}/api-flight-change-service/change/cancel`,
}
