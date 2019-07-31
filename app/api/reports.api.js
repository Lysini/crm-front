import { request } from './common';
const path_to_res = '/report';


export default class ReportsApi {

    checkIfDayIsReported(params) {
        return request(path_to_res + `/is-day-reported`,{
            method:"GET",
            query: params
        });
    }

    addReport(report) {
        return request(path_to_res + `/add`,{
            method:"POST",
            data: report
        });
    }

    updateReport(report, report_id) {
        return request(path_to_res + `/${report_id}/update`,{
            method:"PUT",
            data: report
        });
    }

    getReports(params = {limit: 100}){
        return request(path_to_res + '',{
            method:"GET",
            query: params
        });
    }

    changeReportStatus(report_id, status) {
        return request(path_to_res + `/${report_id}/change-status`,{
            method:"PUT",
            data: {
                status: status
            }
        });
    }

}
