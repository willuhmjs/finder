import net from "net";
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
	const { cmd } = (await request.json());
    command("M601 S1");
    return new Response(await command(cmd));
};


const host = "192.168.50.111"
const port = 8899;
const command = (cmd: string): Promise<string> => {
    return new Promise((resolve) => {
        const client = new net.Socket();
        client.connect(port, host, function() {
            client.write(`~${cmd}\r\n`);
        });

        client.on('data', function(data: string) {
            client.destroy();
            resolve(data.toString());
        });

        client.on('error', function(error: Error) {
            client.destroy();
            resolve(error.message);
        });

        setTimeout(() => {
            client.destroy();
            resolve("Unknown command")
        }, 2000)
    });
};
