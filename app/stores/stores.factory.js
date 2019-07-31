import AuthStore from "./auth.store";
import SendProblemStore from "./send.problem.store";
import AddInvestorStore from './add.investor.store';
import ProblemsListStore from './problems.list.store';
import InvestorsListStore from './investors.list.store';
import EstatesListStore from './estates.list.store';
import AdvisorProfileStore from './advisor.profile.store';
import AddEstateStore from './add.estate.store';
import AddBusinessInvestmentStore from './add.business.investment.store';
import BusinessInvestmentsListStore from './business.investments.list.store'
import AddReportStore from './add.report.store'
import ReportsListForAdminStore from './reports.list.for.admin.store'


const storesFactory =  function() {
	const authStore = new AuthStore();
	const sendProblemStore = new SendProblemStore();
	const addInvestorStore = new AddInvestorStore();
	const problemsListStore = new ProblemsListStore();
	const investorsListStore = new InvestorsListStore();
	const estatesListStore = new EstatesListStore();
	const advisorProfileStore = new AdvisorProfileStore();
	const addEstateStore = new AddEstateStore();
	const addBusinessInvestmentStore = new AddBusinessInvestmentStore();
	const businessInvestmentsListStore = new BusinessInvestmentsListStore();
	const addReportStore = new AddReportStore();
	const reportsListForAdminStore = new ReportsListForAdminStore();

	return {
		authStore,
		sendProblemStore,
		addInvestorStore,
		problemsListStore,
		investorsListStore,
		estatesListStore,
		advisorProfileStore,
		addEstateStore,
		addBusinessInvestmentStore,
		businessInvestmentsListStore,
		addReportStore,
		reportsListForAdminStore
	};
}
const stores = storesFactory()

export default stores
