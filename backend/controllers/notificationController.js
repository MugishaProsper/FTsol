import Notification from "../models/notificationModel.js";
export const createNotification = async (userId, message, type) => {
  console.log(`${userId}`);
  try {
    const notification = new Notification(userId, message, type)

    await notification.save(); // save notification in database

    res.status(200).json({ message : 'New notification created'})
  } catch (error) {
    console.error(error);
  }
}

export const getNotifications = async (req, res) => {
  const userId = req.user.id;
  try {
    const notification = await Notification.find({ user : userId }).sort({ createdAt : -1 });
    res.status(200).json(notification)
  } catch (error) {
    res.status(500).json({ message : 'Server error ', error : error.message })
  }
}

export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if(!notification){
      res.status(404).json({ message : 'Notification not found' })
    }
    notification.isRead = true;
    await notification.save();

    return res.status(200).json({ message : 'Notification marked as read' });

  } catch (error) {

    res.status(500).json({ message : 'Server error', error : error.message })
    
  }
}