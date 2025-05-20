const ENDPOINTS = {
  questions: `api/get-questions`,
  saveAnswers: `api/save-answers`,
  signUp: `api/user-signup`,
  otp: `api/verify-otp`,
  signin: `api/user-signIn`,
  resendOtp: `api/resend-otp`,
  forgotPassword: `api/forgot-password`,
  forgotPasswordOtp: `api/verify-forgot-pass-otp`,
  createPassword: `api/update-forgotten-password`,
  waterTracking: `api/save-water-record`,
  waterIntake: `api/water-tracker`,
  home: `api/user-home`,
  getMyPlan: `api/get-users-plan`,
  getPricePlan: `api/get-price-plan`,
  chat: `api/chat-with-gpt`,
  chatFetch: `api/chat-with-gpt?page=1&limit=20`,
  settings: `api/get-settings`,
};

export default ENDPOINTS;
