import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");

  const [meetingDate, setMeetingDate] = useState("");
  const [meetingStartTime, setMeetingStartTime] = useState("");
  const [meetingEndTime, setMeetingEndTime] = useState("");
  const [meetingUsers, setMeetingUsers] = useState([]);
  const [meetingRoom, setMeetingRoom] = useState("");
  const [roomMeetingsRoom, setRoomMeetingsRoom] = useState("");

  const handleUserRegistration = () => {
    const newUser = {
      id: userId,
      name: userName,
      email: userEmail
    };
    setUsers([...users, newUser]);
    setUserId("");
    setUserName("");
    setUserEmail("");
  };

  const handleAddUser = () => {
    const newUser = {
      id: userId,
      name: userName,
      email: userEmail
    };
    setUsers([...users, newUser]);
    setUserId("");
    setUserName("");
    setUserEmail("");
  };

  const handleAddRoom = () => {
    const newRoom = {
      id: roomId,
      name: roomName
    };
    setRooms([...rooms, newRoom]);
    setRoomId("");
    setRoomName("");
  };

  const handleUpdateUser = (email, newName) => {
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, name: newName } : user
    );
    setUsers(updatedUsers);
  };

  const handleUpdateRoom = (id, newName) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, name: newName } : room
    );
    setRooms(updatedRooms);
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
  };

  const handleDeleteRoom = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
  };

  const handleScheduleMeeting = () => {
    const newMeeting = {
      date: meetingDate,
      startTime: meetingStartTime,
      endTime: meetingEndTime,
      users: meetingUsers,
      room: meetingRoom
    };
    setMeetings([...meetings, newMeeting]);
    setMeetingDate("");
    setMeetingStartTime("");
    setMeetingEndTime("");
    setMeetingUsers([]);
    setMeetingRoom("");
  };

  const getUserMeetings = (email) => {
    return meetings.filter((meeting) =>
      meeting.users.some((user) => user.email === email)
    );
  };

  const getRoomMeetings = (id) => {
    return meetings.filter((meeting) => meeting.room === id);
  };

  return (
    <div>
      <h1>User Registration</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={handleUserRegistration}>Register</button>

      <h1>Add User</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>

      <h1>Add Room</h1>
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleAddRoom}>Add Room</button>

      <h1>List of Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.name} - {user.email}{" "}
            <button onClick={() => handleDeleteUser(user.email)}>Delete</button>{" "}
            <button onClick={() => handleUpdateUser(user.email, "New Name")}>
              Update
            </button>
          </li>
        ))}
      </ul>

      <h1>List of Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.id} - {room.name}{" "}
            <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>{" "}
            <button onClick={() => handleUpdateRoom(room.id, "New Name")}>
              Update
            </button>
          </li>
        ))}
      </ul>

      <h1>Schedule Meeting</h1>
      <input
        type="date"
        placeholder="Date"
        value={meetingDate}
        onChange={(e) => setMeetingDate(e.target.value)}
      />
      <input
        type="time"
        placeholder="Start Time"
        value={meetingStartTime}
        onChange={(e) => setMeetingStartTime(e.target.value)}
      />
      <input
        type="time"
        placeholder="End Time"
        value={meetingEndTime}
        onChange={(e) => setMeetingEndTime(e.target.value)}
      />
      <select
        value={meetingRoom}
        onChange={(e) => setMeetingRoom(e.target.value)}
      >
        <option value="">Select a Room</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>
      <select
        multiple
        value={meetingUsers.map((user) => user.email)}
        onChange={(e) =>
          setMeetingUsers(
            Array.from(e.target.selectedOptions, (option) =>
              users.find((user) => user.email === option.value)
            )
          )
        }
      >
        {users.map((user) => (
          <option key={user.id} value={user.email}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={handleScheduleMeeting}>Schedule</button>

      <h1>My Meetings</h1>
      <ul>
        {getUserMeetings().map((meeting) => (
          <li key={meeting.id}>
            {meeting.room.name} - {meeting.date} - {meeting.startTime} to{" "}
            {meeting.endTime} with{" "}
            {meeting.users.map((user) => user.name).join(", ")}
          </li>
        ))}
      </ul>

      <h1>Room Meetings</h1>
      <select
        value={roomMeetingsRoom}
        onChange={(e) => setRoomMeetingsRoom(e.target.value)}
      >
        <option value="">Select a Room</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>
      <ul>
        {getRoomMeetings().map((meeting) => (
          <li key={meeting.id}>
            {meeting.date} - {meeting.startTime} to {meeting.endTime} with{" "}
            {meeting.users.map((user) => user.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
