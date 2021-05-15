const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn)[1];

export default getRecipientEmail;
