function sendRequest(success, payload) {
  if (!success) return { success: false };
  return { success: true, data: payload };
}

module.exports = {
  sendRequest,
};
