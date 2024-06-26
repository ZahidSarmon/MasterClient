const en = {
  //Common
  update: "Update",
  save: "Save",
  remove: "Remove",
  addNew: "Add New",
  add: "Add",
  close: "Close",
  actions: "Actions",
  all: "All",
  edit: "Edit",
  delete: "Delete",
  selectAll: "Select All",
  swedish: "Swedish",
  english: "English",
  yes: "Yes",
  no: "No",
  msgSureWantToDelete: "Are you sure want to delete?",
  msgSave: "Save information successfully!",
  msgUpdate: "Update information successfully!",
  msgDelete: "Delete information successfully!",
  msgUnauthorized: "You're Unauthorized! Please contract to the administrator.",
  msgForbidden: "Forbidden!!",
  msgNotFound: "Not Found!!",
  msgServerError: "Server Error!!",

  //Change Password
  changePassword:"Change Password",
  oldPassword:"Old Password",
  newPassword:"New Password",
  confirmPassword:"Confirm Password",
  change:"Change",

  //Home
  home: "Home",

  //Module
  module: "Module",
  name: "Name",
  displayName: "Display Name",
  active: "Active",
  displayNameRequired:"Display Name Required!",

  //Customer
  customer: "Customer",
  organization: "Organization",
  server: "Server",
  database: "Database",
  subscriber: "Subscriber",
  type: "Type",
  first: "First",
  last: "Last",
  email: "Email",
  password: "Password",
  retype: "Retype",
  use: "Use",
  internal: "Internal",
  external: "External",
  user: "User",
  test: "Test",
  connection: "Connection",
  register: "Register",
  loading: "Loading",
  subscriptionDeleteConfirm:
    "Delete also database related to this subscription",
  msgUnableHostDelete: "Unable Host Delete!",
  msgPasswordConfirmPassword: "Password and confirm password aren't match!",
  msgSelectModuleAtLeast: "Please select at least one module!",
  msgSelectDatabase: "Please select database!",
  msgGiveServer: "Please give server name!",
  msgGiveDBUserName: "Please give database user name!",
  msgGiveDBUserPassword: "Please give database user password!",

  //Page
  page: "Page",
  title: "Title",
  url: "Url",
  icon: "Icon",
  parent: "Parent",
  ordinal: "Ordinal",
  msgSelectModule: "Please select module",
  msgSelectSubscriberType: "Please select subscriber type",
  msgSelectParent: "Please select parent",

  //Permission
  permission: "Permission",
  role: "Role",
  msgGiveRole: "Please give role",
  msgSelectOnePageAtLeast: "Please select at least one page",

  //User
  subscription: "Subscription",
  msgSelectRole: "Please select role",
  msgSelectSubscription: "Please select subscription",

  //Cost Center
  costCenter: "Cost Center",
  code: "Code",

  //Cost Center Permission
  scope: "Scope",
  fullName: "Full Name",
  msgSelectPermissionScope: "Please select permission scope",
  msgSelectUser: "Please select user",
  msgSelectCostCenterAtLeast: "Please select at least one cost center",

  //Result Sheet or Balance Sheet (Financial Reporting)
  financial: "Financial",
  reporting: "Reporting",
  account: "Account",
  mapping: "Mapping",
  balance: "Balance",
  sheet: "Sheet",
  design: "Design",
  back: "Back",
  range: "Range",
  manage: "Manage",
  select: "Select",
  default: "Default",
  start: "Start",
  end: "End",
  specific: "Specific",
  row: "Row",
  costCenterLevel: "Cost Center Level",
  msgSureDeleteHeaderSubHeader:
    "Are you sure delete this header with all sub headers?",
  msgSureDeleteSubHeader: "Are you sure delete this sub headers?",
  msgSureDeleteResultSheet: "Are you sure want to delete result sheet",
  msgSureDuplicateResultSheet: "Are you sure want to duplicate result sheet",
  msgSureDeleteBalanceSheet: "Are you sure want to delete balance sheet",
  msgSureDuplicateBalanceSheet: "Are you sure want to duplicate balance sheet",

  //Account Group
  declaration: "Declaration",
  group: "Group",
  sign: "Sign",
  msgSelectAccountGroup: "Please select account group",
  msgSelectSource: "Please select source",
  msgSelectCostCenter: "Please select cost center",
  msgSelectCostCenterLevel: "Please select cost center level",
  addSpecificSubHeader: "Add Specific Header",

  //Source
  source: "Source",
  msgGiveSource: "Please give source",

  //Result Sheet
  resultSheet: "Result Sheet",
  manageResultSheet: "Manage Result Sheet",
  addNewRow: "Add New Row",
  header: "Header",
  subHeader: "Sub Header",
  bold: "Bold",
  extraBold: "Extra Bold",
  showSubHeader: "Show Sub Header",
  isPercentage: "Is Percentage",
  resultSheetDesignRow: "Result Sheet Design Row",
  rowName: "Row Name",
  msgSelectResultSheet: "Please select result sheet",
  msgResultSheetNotSelected: "No result sheet selected",
  msgSelectHeader: "Please select header",
  msgSelectSubHeader: "Please select sub header",
  msgSelectSpecificSubHeader: "Please select specific sub header",
  msgGiveDefaultSubHeader: "Please give default sub header",
  msgSelectDefaultSubHeader: "Please select default sub header",
  msgGiveSign: "Please give sign",

  //Balance Sheet
  msgBalanceSheetNotSelected: "No balance sheet selected",
  balanceSheetDesignRow: "Balance Sheet Design Row",
  manageBalanceSheet: "Manage Balance Sheet",
  msgSelectBalanceSheet: "Please select balance sheet",

  //Balance Sheet Mapping
  msgSureDeleteBalanceSheetMapping:
    "Are you sure want to delete balance sheet mapping?",

  //////Fortnox

  //Company
  msgSureAllDataWithCompany:
    "All data related to this company will be deleted. Are you sure want to delete?",
  creationTime: "Creation Time",
  refreshTokenExpiryDate: "RefreshToken Expire Date",
  lastSyncedDate: "Last Synced Date",

  //Customer
  companyId: "Company Id",
  address1: "Address1",
  address2: "Address2",
  city: "City",
  customerNumber: "Customer Number",
  organisationNumber: "Organisation Number",
  phone: "Phone",
  zipCode: "Zip Code",

  //Account
  companyName: "Company Name",
  description: "Description",
  number: "Number",
  sRU: "SRU",
  year: "Year",
  balanceBroughtForward: "Balance Brought Forward",
  balanceCarriedForward: "Balance Carried Forward",
  syncDate: "Sync Date",

  //Account Chart

  //Financial Year
  id: "Id",
  fromDate: "From Date",
  toDate: "To Date",
  accountCharts: "Account Charts",
  accountingMethod: "Accounting Method",

  //Project
  projectNumber: "Project Number",
  startDate: "Start Date",
  endDate: "End Date",
  status: "Status",

  //SyncLog
  masterLogId: "Master Log Id",
  requestedBy: "Requested By",
  requestedAt: "Requested At",
  startedAt: "Started At",
  runStatus: "Run Status",
  hasError: "Has Error",
  errorMessage: "Error Message",
  isFullSync: "Is Full Sync",
  jobRunId: "Job Run Id",
  tryCount: "Try Count",
  syncLogDetails: "Sync Log Details",
  logId: "Log Id",
  completedAt: "Completed At",
  entity: "Entity",

  //CompanySettings
  organizationNumber: "Organization Number",
  address: "Address",
  bG: "BG",
  bIC: "BIC",
  branchCode: "Branch Code",
  contactFirstName: "Contact First Name",
  contactLastName: "Contact Last Name",
  country: "Country",
  countryCode: "Country Code",
  databaseNumber: "Database Number",
  domicile: "Domicile",
  fax: "Fax",
  iBAN: "IBAN",
  pG: "PG",
  phone1: "Phone1",
  phone2: "Phone2",
  taxEnabled: "Tax Enabled",
  vATNumber: "VATNumber",
  visitAddress: "Visit Address",
  visitCity: "Visit City",
  visitCountry: "Visit Country",
  visitCountryCode: "Visit Country Code",
  visitName: "Visit Name",
  visitZipCode: "Visit Zip Code",
  website: "Website",

  //Invoice
  booked: "Booked",
  cancelled: "Cancelled",
  currency: "Currency",
  currencyRate: "Currency Rate",
  currencyUnit: "Currency Unit",
  customerName: "Customer Name",
  documentNumber: "Document Number",
  dueDate: "Due Date",
  externalInvoiceReference1: "External Invoice Reference1",
  externalInvoiceReference2: "External Invoice Reference2",
  invoiceDate: "Invoice Date",
  invoiceType: "Invoice Type",
  noxFinans: "Nox Finans",
  oCR: "OCR",
  voucherNumber: "Voucher Number",
  voucherSeries: "Voucher Series",
  voucherYear: "Voucher Year",
  wayOfDelivery: "Way Of Delivery",
  termsOfPayment: "Terms Of Payment",
  sent: "Sent",
  total: "Total",
  finalPayDate: "Final Pay Date",
  language: "Language",
  lastRemindDate: "Last Remind Date",
  net: "Net",
  notCompleted: "Not Completed",
  offerReference: "Offer Reference",
  orderReference: "Order Reference",
  ourReference: "Our Reference",
  paymentWay: "Payment Way",
  priceList: "Price List",
  printTemplate: "Print Template",
  remarks: "Remarks",
  reminders: "Reminders",
  roundOff: "Round Off",
  taxReduction: "Tax Reduction",
  termsOfDelivery: "Terms Of Delivery",
  totalVAT: "Total VAT",
  vATIncluded: "VAT Included",
  yourOrderNumber: "Your Order Number",
  yourReference: "Your Reference",
  taxReductionType: "Tax Reduction Type",
  isSyncRows: "Is Sync Rows",

  //Invoice Accural
  invoiceNumber: "Invoice Number",
  period: "Period",
  uRL: "URL",

  //Invoice Payment
  amount: "Amount",
  writeOffExist: "Write Off Exist",
  paymentDate: "Payment Date",

  //Supplier Invoice
  administrationFee: "Administration Fee",
  comments: "Comments",
  credit: "Credit",
  creditReference: "Credit Reference",
  disablePaymentFile: "Disable Payment File",
  externalInvoiceNumber: "External Invoice Number",
  externalInvoiceSeries: "External Invoice Series",
  freight: "Freight",
  givenNumber: "Given Number",
  paymentPending: "Payment Pending",
  roundOffValue: "Round Off Value",
  supplierNumber: "Supplier Number",
  supplierName: "Supplier Name",
  vAT: "VAT",
  vATType: "VAT Type",
  salesType: "Sales Type",

  //Supplier Invoice File Connection
  fileId: "File Id",
  supplierInvoiceNumber: "Supplier Invoice Number",

  //Voucher
  transactionDate: "Transaction Date",
  referenceNumber: "Reference Number",
  referenceType: "Reference Type",
  approvalState: "Approval State",

  //Menu
  costCenterPermission: "Cost Center Permission",
  financialReporting: "Financial Reporting",
  "p&lAccountMapping": "P&L Account Mapping",
  "p&lDesign": "P&L Design",
  balanceSheetDesign: "Balance Sheet Design",
  balanceSheetMapping: "Balance Sheet Mapping",
  fortnox: "Fortnox",
  company: "Company",
  accountChart: "Account Chart",
  financialYear: "Financial Year",
  project: "Project",
  syncLog: "Sync Log",
  companySettings: "Company Settings",
  invoice: "Invoice",
  invoiceAccural: "Invoice Accural",
  invoicePayment: "Invoice Payment",
  supplierInvoice: "Supplier Invoice",
  supplierInvoiceFileConnection: "Supplier Invoice File Connection",
  voucher: "Voucher",

  // "Account Mapping" :"Account Mapping",
  // "Back Account Mapping" :"Back Account Mapping",
  // "Result Sheet":"Result Sheet",
  // "Balance Sheet":"Balance Sheet",
  // "Back Balance Sheet Mapping" :"Back Balance Sheet Mapping",
  // "Result Sheet Design Row":"Result Sheet Design Row",
  // "Balance Sheet Mapping":"Balance Sheet Mapping",
  // "Balance Sheet Design Row":"Balance Sheet Design Row",
  // "Manage Result Sheet":"Manage Result Sheet",
  //
  // "Manage Source":"Manage Source",
  // "Manage Account Groups":"Manage Account Groups",
  // "Manage Account Range":"Manage Account Range",
  // "Add Account Range":"Add Account Range",

  // "Swedish Name":"Swedish Name",
  // "Declaration":"Declaration",
  // "Actions":"Actions",
  // "Account Group":"Account Group",
  // "English Name":"English Name",

  // "Design":"Design",
  // "No result sheet selected":"No result sheet selected",
  // "Select Result Sheet":"Select Result Sheet",
  // "Select Balance Sheet":"Select Balance Sheet",
  // "Select Balance Sheet Mapping":"Select Balance Sheet Mapping",
  // "Header":"Header",
  // "Sub Header":"Sub Header",
  // "Row Name":"Row Name",
  // "Bold":"Bold",
  // "Extra Bold":"Extra Bold",
  // "Add New Row":"Add New Row",
  // "Show Sub Header":"Show Sub Header",
  // "Is Percentage":"Is Percentage",
  // "Select":"Select",
  // "Source":"Source",

  // "Cost Center Level":"Cost Center Level",
  // "Start":"Start",
  // "End":"End",
  // "Sign":"Sign",
  // "Default Header":"Default Header",
  // "Specific Sub Header":"Specific Sub Header",
  // "Range":"Range",
  // "Add Specific Header":"Add Specific Header",
  // "Close":"Close",
  // "Balance Sub Header":"Balance Sub Header",
  // "Save information successfully":"Save information successfully",
  // "Update information successfully":"Update information successfully",
  // "Delete information successfully":"Delete information successfully",
  // "All (*) marks are required":"All (*) marks are required",
  // "DatabaseNameErrorMessage": "Database Name must be between 1 and 128 characters.",
  // "Customer":"Customer",
  // "User":"User",
  // "Cost Center Permission":"Cost Center Permission",
  // "Fortnox":"Fortnox",
  // "Company":"Company",
  // "Financial Reporting":"Financial Reporting",
  // "P&L Account Mapping":"P&L Account Mapping",
  // "P&L Design":"P&L Design",
  // "Balance Sheet Design":"Balance Sheet Design"
};

export default en;
