import React from "react";
import Home from '@views/Home'
import AddInvestor from '@views/AddInvestor'
import ProblemsList from '@views/ProblemsList'
import InvestorsList from '@views/InvestorsList'
import AdvisorProfile from '@views/AdvisorProfile'
import AddEstate from '@views/AddEstate'
import EstatesList from '@views/EstatesList'
import AddBusinessInvestment from '@views/AddBusinessInvestment'
import BusinessInvestmentsList from '@views/BusinessInvestmentsList'
import AddReport from '@views/AddReport'
import ReportsListForAdmin from '@views/ReportsListForAdmin'


export const routes = [
  { path: "/app/home", exact: true, name: "Strona główna", icon: "home", component: () => <Home /> , type: 'route', permissions: ["worker", "admin", "investor"] },
  { path: "/app/my-advisor", exact: true, name: "Profil opiekuna", icon: "profile", component: () => <AdvisorProfile /> , type: 'route', permissions: ["investor"] },

  //@@@@@@@ ADMIN WORKER PANEL INVESTORS ROUTES
  { type: "title", name: "Inwestorzy", permissions: ["worker", "admin"]},
  { path: "/app/investors/add", exact: true, name: "Dodaj inwestora", icon: "add", component: () => <AddInvestor />, type: 'route', permissions: ["worker", "admin"] },
  { path: "/app/investors/list", exact: true, name: "Lista inwestorów", icon: "list", component: () => <InvestorsList />, type: 'route', permissions: ["worker", "admin"] },

  //@@@@@@@ ADMIN WORKER PANEL NEEDS ROUTES
  { type: "title", name: "Problemy", permissions: ["worker", "admin"]},
  { path: "/app/needs/list", exact: true, name: "Lista problemów", icon: "list", component: () => <ProblemsList />, type: 'route', permissions: ["worker", "admin"] },

  //@@@@@@@ ADMIN WORKER ESTATE PANEL
  { type: "title", name: "Nieruchomości", permissions: ["worker", "admin"]},
  { path: "/app/estates/add", exact: true, name: "Dodaj nieruchomość", icon: "add", component: () => <AddEstate />, type: 'route', permissions: ["worker", "admin"] },
  { path: "/app/estates/list", exact: true, name: "Lista nieruchomości", icon: "list", component: () => <EstatesList />, type: 'route', permissions: ["worker", "admin"] },

  //@@@@@@@ ADMIN WORKER BUSINESS INVESTMENTS PANEL
  { type: "title", name: "Inwestycje w biznes", permissions: ["worker", "admin"]},
  { path: "/app/business-investments/add", exact: true, name: "Dodaj inwestycje", icon: "add", component: () => <AddBusinessInvestment />, type: 'route', permissions: ["worker", "admin"] },
  { path: "/app/business-investments/list", exact: true, name: "Lista inwestycji", icon: "list", component: () => <BusinessInvestmentsList />, type: 'route', permissions: ["worker", "admin"] },

  //@@@@@@@ ADMIN WORKER REPORTS PANEL
  { type: "title", name: "Raporty", permissions: ["worker", "admin"]},
  { path: "/app/reports/add", exact: true, name: "Dodaj raport", icon: "add", component: () => <AddReport />, type: 'route', permissions: ["worker", "admin"] },
  { path: "/app/reports/list", exact: true, name: "Raporty pracowników", icon: "list", component: () => <ReportsListForAdmin />, type: 'route', permissions: ["admin"] },
];
