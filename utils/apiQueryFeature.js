class ApiFeature {
    constructor(query,queryString){
        this.query = query;
    this.queryString = queryString;

    }

    filter(){
        const queryObj ={...this.queryString}
        let queryStr = JSON.stringify(queryObj);
        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 8;
        const skip = (page - 1) * limit;
    
        this.query = this.query.skip(skip).limit(limit);
    
        return this;
      }
      sort(){
        this.query = this.query.sort({'createdAt':-1})
        return this
      }
    
}
module.exports = ApiFeature;


