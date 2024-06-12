import { Model } from "mongoose";

type LooseObject = { [key: string]: any }

export class QueryFeatures {
    originalQuery: LooseObject
    queryObj: LooseObject
    filterObj: LooseObject
    pagination: {
        page: number
        limit: number
    }

    constructor(originalQuery: LooseObject, initialQuery: LooseObject) {
        this.originalQuery = originalQuery;
        this.queryObj = initialQuery;
        this.filterObj = {}
        this.pagination = {
            page: 0,
            limit: 0,
        }
    }

    filter(invalidQuery: string[]) {
        let queryCloned: any = { ...this.originalQuery };
        invalidQuery.forEach(el => delete queryCloned[el]);

        if (this.originalQuery.status) {
            queryCloned.status = {
                $in: (this.originalQuery.status as string).split('|')
            }
        }
        this.queryObj = this.queryObj.find(queryCloned)
        this.filterObj = queryCloned
        return this
    }

    sort() {
        if (this.originalQuery.sort) {
            this.queryObj = this.queryObj.sort(this.originalQuery.sort as string)
        }
        return this
    }

    paginate() {
        if (this.originalQuery.limit) {
            const limit = Number(this.originalQuery.limit as string) || 10;
            const page = Number(this.originalQuery.page as string) || 1;
            const skip = (page - 1) * limit;
            this.queryObj.skip(skip).limit(limit);
            this.pagination = {
                page,
                limit,
            }
        }
        return this
    }

}