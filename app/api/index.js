import UsersApi from './users.api'
import NeedsApi from './needs.api'
import EstatesApi from './estates.api'
import InvestmentsApi from './investments.api'
import ReportsApi from './reports.api';

const APIs = {
    users: new UsersApi(),
    needs: new NeedsApi(),
    estates: new EstatesApi,
    investments: new InvestmentsApi(),
    reports: new ReportsApi()
}

export default APIs