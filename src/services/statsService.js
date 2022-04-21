import { createContext } from "react";
import { Constants } from "src/utils/constants";
import { v4 as uuidv4 } from 'uuid';

export const StatsServiceContext = createContext(undefined);

let stats = undefined;

const StatsService = ({ children }) => {
    const statsService = {
        retrieveStats() {
            if (stats !== undefined)
                return stats;

            if (typeof window === 'undefined')
                return;

            const unparsedStats = localStorage.getItem(Constants.STATS_LOCAL_STORAGE);

            if (unparsedStats != undefined) {
                stats = JSON.parse(unparsedStats);
                return stats;
            }

            return {
                statDates: {},
                statConfig: []
            };
        },
        saveStats() {
            localStorage.setItem(Constants.STATS_LOCAL_STORAGE, JSON.stringify(stats))
        },
        retrieveDatesOfStat(id) {
            if (stats == undefined)
                this.retrieveStats();

            return stats.statDates[id] || [];
        },
        addDateForStat(id, date, value) {
            if (stats == undefined)
                this.retrieveStats();

            if (stats.statDates[id] === undefined)
                stats.statDates[id] = []

            stats.statDates[id].push({ id: uuidv4(), date: date, value: value });
            this.saveStats();
        },
        addStat(title, maxValue, colors) {
            if (stats == undefined)
                this.retrieveStats();

            stats.statConfig.push({ id: uuidv4(), title: title, max: maxValue, colors: colors });
            this.saveStats();
        },
        removeStat(id) {
            if (stats == undefined)
                this.retrieveStats();

            if (stats.statDates[id]) 
                delete stats.statDates[id];

            stats.statConfig = stats.statConfig.filter((stat) => stat.id != id);
            console.log(stats);
            this.saveStats();
        }
    }

    return <>
        <StatsServiceContext.Provider value={statsService}>
            {children}
        </StatsServiceContext.Provider>
    </>
}

export default StatsService;