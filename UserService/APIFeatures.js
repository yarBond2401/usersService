class APIFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(field => delete queryObj[field]);
        const queryString = JSON.stringify(queryObj);
        const queryStr = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
        return this;
    }

    limitFields() {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
        return this;
    }

    paginate() {
        const page = Number(this.queryString.page);
        const limit = Number(this.queryString.limit);
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;
