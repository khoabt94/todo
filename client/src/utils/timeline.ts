import { Timeline } from "@/enums";
import moment from "moment";

// client: { deadline: { gte: ISODate("2021-01-01"), lte: ISODate("2020-05-01"} }

export function getQueryDate(query: Timeline) {
    const result: {
        gte: string,
        lte: string,
    } = {
        gte: moment().toISOString(),
        lte: moment().toISOString(),
    };

    switch (query) {
        case Timeline.THIS_WEEK:
            result.gte = moment().startOf('isoWeek').toISOString();
            result.lte = moment().add(1, 'week').startOf('isoWeek').toISOString();
            break;
        case Timeline.NEXT_WEEK:
            result.gte = moment().add(1, 'week').startOf('isoWeek').toISOString();
            result.lte = moment().add(1, 'week').endOf('isoWeek').toISOString();
            break;
        case Timeline.THIS_MONTH:
            result.gte = moment().startOf('month').toISOString();
            result.lte = moment().endOf('month').toISOString();
            break;
        case Timeline.NEXT_MONTH:
            result.gte = moment().add(1, 'month').startOf('month').toISOString();
            result.lte = moment().add(1, 'month').endOf('month').toISOString();
            break;

        default:
            break;
    }

    return {
        'deadline[$gte]': result.gte,
        'deadline[$lte]': result.lte
    }
} 