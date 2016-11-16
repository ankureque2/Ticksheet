export class RegistrationInfo{
activationCode: string;
connected: boolean;
housebuildingServerName: string;

constructor(code:string, connected:boolean, housebuildingServer: string)
    {
        this.activationCode = code;
        this.connected = connected;
        this.housebuildingServerName = housebuildingServer;
    }
}