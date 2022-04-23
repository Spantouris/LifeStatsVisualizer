import { createContext } from "react";
import { Constants } from "src/utils/constants";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

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

            stats = {
                statDates: {},
                statConfig: []
            };
            return stats;
        },
        saveStats() {
            localStorage.setItem(Constants.STATS_LOCAL_STORAGE, JSON.stringify(stats))
        },
        clearStats() {
            stats = {
                statDates: {},
                statConfig: []
            };
            this.saveStats();
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
                stats.statDates[id] = {}

            const dateString = moment(date).format('YYYY-MM-DD');

            if (stats.statDates[id][dateString]) {
                stats.statDates[id][dateString] += value
            }
            else {
                stats.statDates[id][dateString] = value;
            }
            this.saveStats();
        },
        addStat(title, maxValue, colors) {
            if (stats == undefined)
                this.retrieveStats();

            stats.statConfig = [...stats.statConfig, { id: uuidv4(), title: title, max: maxValue, colors: colors }];
            this.saveStats();
        },
        updateStat(id, title, maxValue, colors) {
            if (stats == undefined)
                this.retrieveStats();

            const stat = stats.statConfig.find((s) => s.id === id);
            stat.title = title;
            stat.maxValue = maxValue;
            stat.colors = colors;
            this.saveStats();
        },
        removeStat(id) {
            if (stats == undefined)
                this.retrieveStats();

            if (stats.statDates[id])
                delete stats.statDates[id];

            stats.statConfig = stats.statConfig.filter((stat) => stat.id != id);
            this.saveStats();
        },
        updateDate(id, date, value) {
            if (stats == undefined)
                this.retrieveStats();

            const dateString = moment(date).format('YYYY-MM-DD');
            if (!stats.statDates[id] || !stats.statDates[id][dateString])
                return;

            stats.statDates[id][dateString] = value;
            this.saveStats();
        },
        removeDate(id, date) {
            if (stats == undefined)
                this.retrieveStats();

            if (!stats.statDates[id])
                return;

            const dateString = moment(date).format('YYYY-MM-DD');
            delete stats.statDates[id][dateString];
            this.saveStats();
        },
        importStats(importedStats) {
            stats = importedStats;
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