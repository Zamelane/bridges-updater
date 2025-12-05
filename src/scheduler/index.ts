import { Cron } from "croner";
import { Tor } from "../tor";

class Scheduler {
    constructor() { }

    public async init() {
        const cron = new Cron('0 0 * * * *', async () => {
            try {
                const tor = new Tor();
                if (!await tor.login()) {
                    console.log('Error login...');
                    return;
                }

                const bridges = await tor.getBridges();
                if (!bridges) {
                    console.log('Error get bridges...');
                    return;
                }

                await tor.setBridges(bridges);
                console.log('Bridges update');
            } catch (error) {
                console.error('Cron job failed:', error);
            }

            console.log('Next run: ' + cron.nextRun());
        });

        console.log('Next run: ' + cron.nextRun());
    }
}

export { Scheduler }