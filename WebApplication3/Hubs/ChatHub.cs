using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace WebApplication3.Hubs
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.addChatMessage(new { Name = name, Message = message });

        }
        public async Task JoinRoom(string roomName)
        {
            await Groups.Add(Context.ConnectionId, roomName);
            Clients.Group(roomName).addChatMessage(new { Name = roomName, Message = Context.User.Identity.Name + " joined." });
        }

        public Task LeaveRoom(string roomName)
        {
            Clients.Group(roomName).addChatMessage(new { Name = roomName, Message =  Context.User.Identity.Name+ "Leave" + roomName });
            return Groups.Remove(Context.ConnectionId, roomName);
        }
        public void SendToGroup(string roomName, string message)
        {
            Clients.Group(roomName).addChatMessage(new { Name = roomName, Message = message });

        }
    }
}