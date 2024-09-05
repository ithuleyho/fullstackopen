const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }
  const { message, kind } = notification;

  const style = {
    background: 'lightgrey',
    fontSize: 20 + 'px',
    borderStyle: 'solid',
    borderRadius: 5 + 'px',
    padding: 10 + 'px',
    marginBottom: 10 + 'px'
  };

  const notificationColours = {
    error: 'red',
    success: 'green'
  };

  style['color'] = notificationColours[kind];

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;
