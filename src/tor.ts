import { env } from "bun";

class Tor {
    private cookie = '';
    private static lastUpdate: Date | undefined

    constructor() { }

    public async login() {
        const formData = new URLSearchParams();
        formData.append('password', env.password as string);
        formData.append('login', '1');

        const response = await fetch(env.url as string, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        let cookie: string | undefined | null = response.headers.get('Set-Cookie');

        //console.log(await response.text());

        if (!response.ok || !cookie) {
            return false;
        }

        cookie = cookie.split(';')[0];

        if (!cookie) {
            return false;
        }

        this.cookie = cookie;

        return true;
    }

    public async setBridges(bridges: string) {
        const formData = new URLSearchParams();
        formData.append('fileName', '/etc/tor/bridges.txt');
        formData.append('content', bridges);
        formData.append('save', '1');

        try {
            const response = await fetch(env.url as string, {
                method: 'POST',
                body: formData,
                headers: {
                    Cookie: this.cookie
                }
            })
        } catch {
            console.log('error')
        }

        Tor.lastUpdate = new Date()
    }

    public async getBridges() {
        const response = await fetch('https://torscan-ru.ntc.party/relays.txt', {
            method: 'GET'
        })
        
        if (!response.ok) {
            return false
        }

        return await response.text()
    }

    public static getLastUpdate() {
        return this.lastUpdate ?? 'никогда'
    }
}

export { Tor }