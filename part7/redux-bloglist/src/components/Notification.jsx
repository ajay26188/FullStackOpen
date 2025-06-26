import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notificationMessage)

  const notificationType = useSelector(state => state.notificationType)  

    if (!notification) return null
  
    const messageStyle = {
      color: notificationType === 'success' ? 'green' : 'red',
      padding: '10px',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius : '5px',
      marginBottom: '10px'
    }
  
    return (
      <div style={messageStyle} className="notification-box">
        {notification}
      </div>
    )
  }

  export default Notification