using GTANetworkAPI;
using GTANetworkMethods;

namespace ServerSide
{
    public class Main : Script
    {

        [ServerEvent(Event.ResourceStart)]

        public void OnresourceStart()
        {
            NAPI.Util.ConsoleOutput("Server Started");


            

        }


    }
}