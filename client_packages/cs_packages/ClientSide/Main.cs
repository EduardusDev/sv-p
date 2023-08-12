using RAGE;
using System;
using System.Collections.Generic;
using System.Text;
namespace ClientSide
{
    public class Main : Events.Script
    {
        public Main()
        {
            Events.OnPlayerReady += OnPlayerReady;
            Events.Add("HideChat", HideChat);
            Events.Add("ShowChat", ShowChat);

        }


        private void OnPlayerReady()
        {
            RAGE.Chat.Output("Bienvenido a Los Angeles RP");

        }

        private void HideChat(object[] args)
        {
            Chat.Show(false);
        }

        private void ShowChat(object[] args)
        {
            Chat.Show(true);
        }


    }
}