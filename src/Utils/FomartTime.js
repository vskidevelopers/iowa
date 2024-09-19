export default function formatTime(timestamp) {
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  const formattedMinutes = String(minutes).padStart(2, "0"); // Add leading zero if needed
  const formattedSeconds = String(seconds).padStart(2, "0"); // Add leading zero if needed

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
}
