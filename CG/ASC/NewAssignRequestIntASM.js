import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Col, Row, Accordion, Form, InputGroup, Table } from 'react-bootstrap';
import { CgArrowsExchange, CgFileDocument } from 'react-icons/cg';
import { FaCircle, FaDownload, FaEye, FaFileDownload, FaMinusCircle, FaTrash, FaUserCircle } from 'react-icons/fa';
import { FaCircleCheck, FaCircleMinus, FaCirclePlus, FaPrint, FaRegCircleCheck } from 'react-icons/fa6';
import { IoIosArrowRoundBack, IoIosDownload, IoMdSave } from 'react-icons/io';
import { IoArrowUpOutline, IoCallOutline, IoMail, IoSave, IoSyncOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../GenericModal';
import { MdEdit, MdVerifiedUser } from 'react-icons/md';
import { Input } from 'antd';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { BsInfoCircleFill } from 'react-icons/bs';
import { IconButton, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { error } from 'jquery';
import moment from 'moment';
import { MultiSelect } from 'react-multi-select-component';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { usePathName } from '../../../constants';
import ReactToPrint from 'react-to-print';
import PrintableComponent from '../JobSheets/PrintableComponent';
import JobSheet from '../JobSheets/JobSheet';
import ACJobSheet from '../JobSheets/ACJobSheet';
import PrintFHP from '../JobSheets/PrintFHP';
import PrintDC from '../JobSheets/PrintDC';
import PrintAlternator from '../JobSheets/PrintAlternator';
import PrintAC from '../JobSheets/PrintAC';
import FHPEmpty from '../JobSheets/FHPEmpty';
import EmptyJobSheet from '../JobSheets/EmptyJobSheet';
import DCJobsheetEmpty from '../JobSheets/DCJobsheetEmpty';
import ACJobSheetEmpty from '../JobSheets/ACJobSheetEmpty';
import AlternatorSheetEmpty from '../JobSheets/AlternatorSheetEmpty';
import AlternatorSheet from '../JobSheets/AlternatorSheet';
import FHP from '../JobSheets/FHP';
import DCJobsheet from '../JobSheets/DCJobsheet';
import lodash from 'lodash';
import { handleResponse } from '../../Generic/utility';
import Spinner from '../Spinner';


const NewAssignRequestIntASM = () => {
    const pathName = usePathName();
    const navigate = useNavigate();
    const Username = localStorage.getItem("UserName")














    let RoleName = localStorage.getItem("RoleName");
    const [file, setFile] = useState();
    const [empty, setEmpty] = useState("no");

    let acknowledgementStatus = localStorage.getItem("acknowledgementType");

    console.log(acknowledgementStatus)
    let pageLabel = localStorage.getItem("TicketInfoLabel");
    let token = localStorage.getItem("UserToken");
    let asc = localStorage.getItem("UID");

    let DateLockCurrent = localStorage.getItem('currentDate')

    let serTicId = localStorage.getItem("ViewEditRequest");
    // console.log(serTicId)
    // let dateLock;

    const [dateLock, setDateLock] = useState('')



    let requestDate = localStorage.getItem("requestDate")?.split("/");
    const [showIsActive1, setIsActive1] = useState(false);
    const handleShowIsActive1 = () => setIsActive1(true);
    const handleCloseIsActive1 = () => setIsActive1(false);







    let reqDate = requestDate[2] + "-" + requestDate[0] + "-" + requestDate[1]






























    // ---------------------------------------------------------------------Integration Part-------------------------------------------------
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format

    const [tab1, settab1] = useState({
        ascCustomerContactedId: 0,
        serviceTicketId: "",
        complainType: "",
        contactDate: '',
        serialNo: "",
        productCode: "",
        invoiceDate: "",
        invoiceNo: "",
        frame: "",
        kw: "",
        kva: "",
        effe: "",
        flps: "",
        hp: "",
        remarks: "",
        serviceRequestSubStatusId: "0",
        serviceRequestCustStatusid: "0",
        productRquestDate: "",
        technicianId: "0",
        ManufacturingDate: "",
        DateOfDispatch: ""


    })

    // console.log(tab1?.contactDate, 'daete-------------------')

    // useEffect(() => {
    //     settab1((pre) => {
    //         return {
    //             ...pre,
    //             contactDate: DateLockCurrent,
    //         }
    //     })

    // }, [])


    const handleChange = (e) => {
        const newdata = { ...tab1 };
        newdata[e.target.name] = e.target.value;
        settab1(newdata);

        // console.log(newdata, 'new--------------------')






        // console.log(newdata);
    }






    const [StSubStatus, setStSubStatus] = useState([]);


    const [subSubStatus, setsubSubStatus] = useState([])


    const [ticketInfo, setticketInfo] = useState([]);



    const [partConsumption, setpartConsumption] = useState(false)
    const [engSelect, setEngSelect] = useState(false)
    const [techSelect, setTechSelect] = useState(false)




    const [selectTechCity1, setselectTechCity1] = useState(false)
    const [selectTechCity2, setselectTechCity2] = useState(false)


    // console.log(metroCityNonSelect);


    const [metroCity, setMetroCity] = useState(false)
    const [nonmetroCity, setNonMetroCity] = useState(false)

    const [selectCity, setSelectCity] = useState('')

    const [showTypeOfWorkDone, setShowTypeOfWorkDone] = useState(false)

    const [showCity, setShowCity] = useState(false)






    useEffect(() => {
        if (engSelect && techSelect) {
            fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    let filterEngg = result?.filter(item =>
                        item.activityId != '10048' &&
                        item.activityId != '10050' &&
                        item.activityId != '10047' &&
                        item.activityId != '10049')
                    console.log('Filtered Activities:', filterEngg);
                    setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                        value: activity?.activityId,
                        label: activity?.activityName
                    })));
                })
        }
        else if (!engSelect && !techSelect) {
            console.log('blank')
            setOptionsypeWorkDone([])
            // fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // })
            //     .then((res) => res.json())
            //     .then((result) => {
            //         // console.log(result);
            //         // setOptionsypeWorkDone(result?.activityName)
            //         setOptionsypeWorkDone(result?.map((activity) => ({ value: activity?.activityId, label: activity?.activityName })))

            //     })
        }
    }, [engSelect, techSelect])


    const [selectTech, setSelectTech] = useState('')


    const [selectPartConsumption, setselectPartConsumption] = useState("")




    const [yearDateLock, setYearDate] = useState('')

    const [tab3, settab3] = useState({
        AscServiceTicketFIRId: 0,
        ServiceTicketId: serTicId,
        SerialNo: "",
        ProductCode: "",
        DivisionCode: "",
        DivisionName: '',
        productLineName: '',
        ProductLineCode: "",
        ProductGroupCode: "",
        ProductDescription: "",
        BatchNo: "",
        Frame: "",
        Kva: "",
        Hp: "",
        InvoiceDate: "",
        InvoiceNo: "",
        warrantyDate: "",
        InvoiceFile: "",
        TypeOfApplication: "",
        NoOfHours: 0,
        DefectList: [],
        FailureObservation: "",
        DocumentWithType: [],
        ClosureStatusId: "",
        ReplacementTagApplied: "",
        ReplacementTagFile: "",
        TypeOfWorkDoneId: [],
        DetailsOfWorkDone: "",
        SpareList: [],

        ManufacturingDate: "",
        DateOfDispatch: "",
        DateOfCommissioning: '',
        FailureReportedDate: '',
        ProductFailureDate: '',
        FrameSizeId: 0





    })


    console.log(tab3);

    useEffect(() => {
        let invoiceDateStr = tab1?.invoiceDate;
        // console.log(invoiceDateStr);

        if (invoiceDateStr) {
            const invoiceDate = new Date(invoiceDateStr);
            const warrantyDate = new Date(invoiceDate);
            warrantyDate.setMonth(invoiceDate.getMonth() + 12);
            /// warrantyDate.setDate(warrantyDate.getDate() - 1);

            const warrantyDateStr = warrantyDate.toISOString().split('T')[0];

            settab3((prevState) => ({
                ...prevState,
                warrantyDate: warrantyDateStr
            }));
        }



    }, [tab1?.invoiceDate])






    // // console.log("Invoice Date:", tab3?.InvoiceDate);
    // // console.log("Warranty Date:", tab3?.warrantyDate);



    const handleChangeTab3 = (e) => {
        const newdata = { ...tab3 };
        newdata[e.target.name] = e.target.value;
        settab3(newdata);





        // console.log(newdata);
    }
    const handleChangeTab3Serial = (e) => {
        const selectedSerial = e.target.value;
        const newdata = { ...tab3 };






        settab3((prevState) => ({
            ...prevState,
            SerialNo: selectedSerial
        }));

        debouncedSerailNumber(selectedSerial);





        // console.log(newdata);
    }




    const [submittedSpareList, setsubmittedSpareList] = useState([])

    const [submittedTypeOfWorkDone, setsubmittedTypeOfWorkDone] = useState([])


    const [applicationTypes, setapplicationTypes] = useState([])



    const [allDefects, setallDefects] = useState([])

    const [submittedDataTab2, setsubmittedDataTab2] = useState([])



    const [submittedDataTab3, setsubmittedDataTab3] = useState([])


    const [submittedDataTab4, setsubmittedDataTab4] = useState([])





    const [addActivityIten, setaddActivityIten] = useState([])
    const [addActivityItenTable, setaddActivityItenTable] = useState([])



    const allStatus = (division) => {
        fetch(`${process.env.REACT_APP_API_URL}Common/GetAllActivityStatus?ServiceTicketId=${serTicId}&ActivityType=${(tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") ? 163 : 164}&DivisionCode=${division}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);



                let siteVisitExists = (addActivityItenTable?.some(activity => activity.activeStatusId == "Site Visit") || submittedDataTab2?.some(i => i.statusName == "Site Visit"))
                // console.log(siteVisitExists);
                // console.log(tab1);
                if (((tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") && siteVisitExists) || ((tab1?.serviceRequestSubStatusId != "30" || submittedDataTab1?.serviceRequestSubStatusId != "30") && (addActivityItenTable?.length < 1 || submittedDataTab2?.length < 1))) {
                    console.log(result);
                    setactivityStatus(result)
                }
                else if ((ticketInfo[0]?.divisionCode != 'M4' || ticketInfo[0]?.divisionCode != "M3")) {
                    console.log(result);
                    setactivityStatus(result)
                }
                else if ((!siteVisitExists) && (ticketInfo[0]?.divisionCode == "M4")) {
                    let filtered = result?.filter(i => i?.parameterTypeId == "16")
                    // console.log(filtered);
                    setactivityStatus(filtered)


                }
                else if ((!siteVisitExists) && (ticketInfo[0]?.divisionCode == "M3")) {
                    let filtered = result?.filter(i => i?.parameterTypeId == "15")
                    console.log(filtered);
                    setactivityStatus(filtered)


                }


            })

    }




    const fetchdataById = () => {

        fetch(
            `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketSearchById?ServiceTickeId=${serTicId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setticketInfo(result);
                localStorage.setItem("ticketInfo", JSON.stringify(result))
                setInvoiceBatchDate(result[0]?.batchEndDate)


                if (result) {

                    settab1((pre) => {
                        return {
                            ...pre,
                            serviceTicketId: result[0]?.serviceTicketId,
                            serialNo: result[0]?.sernr,
                            productCode: result[0]?.matnr,
                            invoiceDate: result[0]?.invoiceDate,
                            invoiceNo: result[0]?.invoiceNo,
                            frame: result[0]?.frame,
                            kw: result[0]?.kw,
                            kva: result[0]?.kva,
                            effe: result[0]?.effe,
                            flps: result[0]?.flps,
                            hp: result[0]?.hp,
                            ManufacturingDate: result[0]?.manufacturingDate,
                            DateOfDispatch: result[0]?.dateOfDispatch

                        }
                    })

                    // console.log(result[0]?.batchCode);

                    settab3((pre) => {
                        return {
                            ...pre,
                            SerialNo: result[0]?.sernr,
                            ProductCode: result[0]?.matnr,
                            DivisionCode: result[0]?.divisionCode,
                            DivisionName: result[0]?.divisionName,
                            ProductLineCode: result[0]?.productLineCode,
                            productLineName: result[0]?.productLineName,
                            ProductGroupCode: result[0]?.productGroupName,
                            ProductDescription: result[0]?.productDescription,
                            BatchNo: result[0]?.batchCode,
                            Frame: result[0]?.frame,
                            Kva: result[0]?.kva,
                            Hp: result[0]?.hp,
                            // warrantyDate: result[0]?.batchEndDate?.split(" ")[0],
                            InvoiceFile: result[0]?.invoceFilePath,
                            InvoiceDate: result[0]?.invoiceDate?.split(" ")[0],
                            InvoiceNo: result[0]?.invoiceNo,
                            ManufacturingDate: result[0]?.manufacturingDate,
                            DateOfDispatch: result[0]?.dateOfDispatch,
                            FrameSizeId: result[0]?.frameSizeId
                        }
                    })



                }


                let a = result[0]?.batchStartDate;
                // console.log(a, '11111111111111')
                a = moment(a).format("YYYY-MM-DD")
                let d1 = new Date(a);
                let d2 = new Date(tab1.invoiceDate);
                // console.log(a, 'a---------')
                setMinInvoiceDate(a);
                if (d1 > d2) {
                    settab1((pre) => {
                        return {
                            ...pre,
                            invoiceDate: ""
                        }
                    }
                    )
                }





                fetch(`${process.env.REACT_APP_API_URL}DefectCategory/GetAllDefectCategory?DivisionCode=${result[0]?.divisionCode}&ProductLineCode=${result[0]?.productLineCode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((result) => {
                        // console.log(result);
                        setdefectCategories(result)

                    })




                if (result[0]?.tabActive == "Tab1") {
                    setactiveKeyEdit("1")
                }
                else if (result[0]?.tabActive == "Tab2" ||result[0]?.tabActive == "Tab3") {
                    setactiveKeyEdit("2")
                }
                // else if (result[0]?.tabActive == "Tab3") {
                //     setactiveKeyEdit("3")
                // }









                //    -----------------------status



                allStatus(result[0]?.divisionCode)


            })
    }


    useEffect(() => {
        fetchdataById()
    }, [addActivityItenTable])














    // ---------------------reassign tech -----------------------------//



    const [reassigTech, setReassignTech] = useState('')

    // console.log(reassigTech)

    const [ASCNames, setASCNames] = useState([]);
    const [showTechnician, setShowTechnician] = useState(false);
    const [ASCWiseTecnicians, setASCWiseTecnicians] = useState([]);

    const handleCloseTechnician = () => {
        setShowTechnician(false);
        setTechData({
            serviceTicketId: serTicId,
            technicianId: 0,
            remark: "",
            assignDate: ''

        })
    }

    const [TechData, setTechData] = useState({
        serviceTicketId: serTicId,
        technicianId: 0,
        remark: "",
        assignDate: ''
    })


    const handleShowTechnician = () => {
        fetch(
            `${process.env.REACT_APP_API_URL}Technician/GetAscWiseTechnician?ascCode=${asc}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);

                setASCWiseTecnicians(result);
            });

        setShowTechnician(true);
    }


    const getSubmittedData = () => {

        fetch(`${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/GetServiceTicketTaskDetailsByIdAsync?ServiceTicketId=${serTicId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then(((result) => {
                // console.log(result);




                settab1((pre) => {
                    return {
                        ...pre,
                        contactDate: result?.ascServiceTicketCustomer[0]?.contactDate ? result?.ascServiceTicketCustomer[0]?.contactDate?.split(" ")[0] : "",
                        serialNo: result?.ascServiceTicketCustomer[0]?.serialNo,
                        productCode: result?.ascServiceTicketCustomer[0]?.productCode,
                        invoiceDate: result?.ascServiceTicketCustomer[0]?.invoiceDate ? result?.ascServiceTicketCustomer[0]?.invoiceDate?.split(" ")[0] : "",
                        invoiceNo: result?.ascServiceTicketCustomer[0]?.invoiceNo,
                        frame: result?.ascServiceTicketCustomer[0]?.frame ? result?.ascServiceTicketCustomer[0]?.frame : "",
                        kw: result?.ascServiceTicketCustomer[0]?.kw ? result?.ascServiceTicketCustomer[0]?.kw : "",
                        kva: result?.ascServiceTicketCustomer[0]?.kva ? result?.ascServiceTicketCustomer[0]?.kva : "",
                        effe: result?.ascServiceTicketCustomer[0]?.effe ? result?.ascServiceTicketCustomer[0]?.effe : "",
                        flps: result?.ascServiceTicketCustomer[0]?.flps ? result?.ascServiceTicketCustomer[0]?.flps : "",
                        hp: result?.ascServiceTicketCustomer[0]?.hp ? result?.ascServiceTicketCustomer[0]?.hp : "",
                        serviceRequestSubStatusId: result?.ascServiceTicketCustomer[0]?.serviceRequestSubStatusId ? result?.ascServiceTicketCustomer[0]?.serviceRequestSubStatusId : "0",
                        serviceRequestCustStatusid: result?.ascServiceTicketCustomer[0]?.serviceRequestCustStatusid ? result?.ascServiceTicketCustomer[0]?.serviceRequestCustStatusid : "0",
                        productRquestDate: result?.ascServiceTicketCustomer[0]?.productRquestDate ? result?.ascServiceTicketCustomer[0]?.productRquestDate?.split(" ")[0] : "",
                        technicianId: result?.ascServiceTicketCustomer[0]?.technicianId ? result?.ascServiceTicketCustomer[0]?.technicianId : '0',
                        remarks: result?.ascServiceTicketCustomer[0]?.remarks ? result?.ascServiceTicketCustomer[0]?.remarks : '',
                        ManufacturingDate: result?.ascServiceTicketCustomer[0]?.manufacturingDate ? result?.ascServiceTicketCustomer[0]?.manufacturingDate : '',
                        DateOfDispatch: result?.ascServiceTicketCustomer[0]?.dateOfDispatch ? result?.ascServiceTicketCustomer[0]?.dateOfDispatch : '',
                        // DateOfCommissioning: result?.ascServiceTicketCustomer[0]?.dateOfCommissioning ? result?.ascServiceTicketCustomer[0]?.dateOfCommissioning : '',
                        // FailureReportedDate: result?.ascServiceTicketCustomer[0]?.failureReportedDate ? result?.ascServiceTicketCustomer[0]?.failureReportedDate : '',
                        // ProductFailureDate: result?.ascServiceTicketCustomer[0]?.productFailureDate ? result?.ascServiceTicketCustomer[0]?.productFailureDate : '',




                    }
                })


                if (result?.ascServiceTicketFirlist[0]) {

                    settab3((pre) => {
                        return {
                            ...pre,
                            SerialNo: result?.ascServiceTicketFirlist[0]?.serialNo ? result?.ascServiceTicketFirlist[0]?.serialNo : "",
                            BatchNo: result?.ascServiceTicketFirlist[0]?.batchCode ? result?.ascServiceTicketFirlist[0]?.batchCode : "",
                            ProductCode: result?.ascServiceTicketFirlist[0]?.productCode ? result?.ascServiceTicketFirlist[0]?.productCode : "",
                            DivisionCode: result?.ascServiceTicketFirlist[0]?.divisionCode ? result?.ascServiceTicketFirlist[0]?.divisionCode : "",
                            DivisionName: result?.ascServiceTicketFirlist[0]?.divisionName ? result?.ascServiceTicketFirlist[0]?.divisionName : "",
                            ProductLineCode: result?.ascServiceTicketFirlist[0]?.productLineCode ? result?.ascServiceTicketFirlist[0]?.productLineCode : "",
                            productLineName: result?.ascServiceTicketFirlist[0]?.productLineName ? result?.ascServiceTicketFirlist[0]?.productLineName : "",
                            ProductGroupCode: result?.ascServiceTicketFirlist[0]?.productGroupName ? result?.ascServiceTicketFirlist[0]?.productGroupName : "",
                            ProductDescription: result?.ascServiceTicketFirlist[0]?.productDescription ? result?.ascServiceTicketFirlist[0]?.productDescription : "",
                            FailureObservation: result?.ascServiceTicketFirlist[0]?.failureObservation ? result?.ascServiceTicketFirlist[0]?.failureObservation : "",
                            DetailsOfWorkDone: result?.ascServiceTicketFirlist[0]?.detailsOfWorkDone ? result?.ascServiceTicketFirlist[0]?.detailsOfWorkDone : "",
                            ReplacementTagApplied: result?.ascServiceTicketFirlist[0]?.replacementTagApplied ? result?.ascServiceTicketFirlist[0]?.replacementTagApplied : "",
                            ClosureStatusId: result?.ascServiceTicketFirlist[0]?.closureStatusName ? result?.ascServiceTicketFirlist[0]?.closureStatusName : "",
                            Frame: result?.ascServiceTicketFirlist[0]?.frame ? result?.ascServiceTicketFirlist[0]?.frame : "",
                            Kva: result?.ascServiceTicketFirlist[0]?.kva ? result?.ascServiceTicketFirlist[0]?.kva : "",
                            Hp: result?.ascServiceTicketFirlist[0]?.hp ? result?.ascServiceTicketFirlist[0]?.hp : "",
                            // warrantyDate: result?.ascServiceTicketFirlist[0]?.warrantyDate ? result?.ascServiceTicketFirlist[0]?.warrantyDate : "",
                            InvoiceDate: result?.ascServiceTicketFirlist[0]?.invoiceDate ? result?.ascServiceTicketFirlist[0]?.invoiceDate?.split(" ")[0] : "",
                            InvoiceNo: result?.ascServiceTicketFirlist[0]?.invoiceNo ? result?.ascServiceTicketFirlist[0]?.invoiceNo : "",
                            TypeOfApplication: result?.ascServiceTicketFirlist[0]?.typeOfApplication ? result?.ascServiceTicketFirlist[0]?.typeOfApplication : "",
                            NoOfHours: result?.ascServiceTicketFirlist[0]?.noOfHours ? result?.ascServiceTicketFirlist[0]?.noOfHours : "",
                            ManufacturingDate: result?.ascServiceTicketFirlist[0]?.manufacturingDate ? result?.ascServiceTicketFirlist[0]?.manufacturingDate : '',
                            DateOfDispatch: result?.ascServiceTicketFirlist[0]?.dateOfDispatch ? result?.ascServiceTicketFirlist[0]?.dateOfDispatch : '',
                            DateOfCommissioning: result?.ascServiceTicketFirlist[0]?.dateOfCommissioning ? result?.ascServiceTicketFirlist[0]?.dateOfCommissioning : '',
                            FailureReportedDate: result?.ascServiceTicketFirlist[0]?.failureReportedDate ? result?.ascServiceTicketFirlist[0]?.failureReportedDate : '',
                            ProductFailureDate: result?.ascServiceTicketFirlist[0]?.productFailureDate ? result?.ascServiceTicketFirlist[0]?.productFailureDate : '',
                            FrameSizeId: result?.ascServiceTicketFirlist[0]?.frameSizeId ? result?.ascServiceTicketFirlist[0]?.frameSizeId : ''








                        }
                    })

                    setVerifyFristStepFir(true)

                }



                if (result?.ascServiceTicketFirlist[0]?.defectList?.length > 0) {

                    setDefectListTable(result?.ascServiceTicketFirlist[0]?.defectList)
                    setVerifyFristSecondFir(true)

                }


                setverifiedWarrantyStatus(result?.ascServiceTicketCustomer[0]?.warrantyDateStatus)

                setverifiedWarrantyFromInvoice(result?.ascServiceTicketCustomer[0]?.invoiceDateStatus)

                settab3((pre) => {
                    return {
                        ...pre,
                        SerialNo: result?.ascServiceTicketCustomer[0]?.serialNo,
                        ProductCode: result.ascServiceTicketCustomer[0]?.productCode,
                        // invoiceDate:result.ascServiceTicketCustomer[0]?.invoiceDate.split(' ')[0]

                    }
                })
                if (result?.ascServiceTicketCustomer) {

                    setsubmittedDataTab1(result?.ascServiceTicketCustomer[0])
                }


                if (result?.ascSiteVisitAndProductReceived) {
                    setsubmittedDataTab2(result?.ascSiteVisitAndProductReceived)
                }


                if (result?.ascServiceTicketFirlist?.length > 0) {
                    setsubmittedDataTab3(result?.ascServiceTicketFirlist[0])

                    setsubmittedSpareList(result?.ascServiceTicketFirlist[0]?.sparelist)


                    setsubmittedTypeOfWorkDone(result?.ascServiceTicketFirlist[0]?.typeOfWorkDoneId?.split(","))

                    // console.log(result?.ascServiceTicketFirlist[0]?.typeOfWorkDoneId?.split(","));


                    // console.log(result?.ascServiceTicketFirlist[0]?.sparelist)
                }


                // console.log(result?.ascSiteVisitAndProductReceived);
                // console.log(result?.ascSiteVisitAndProductReceived[0]?.activityName);
                setReassignTech(result?.ascSiteVisitAndProductReceived[0]?.activityName)



                setaddActivityItenTable(result?.ascSiteVisitAndProductReceived)





            }))
    }


    const [documentTypeList, setdocumentTypeList] = useState([])

    // console.log(tab3)



    useEffect(() => {
        // // console.log(data);

        fetch(
            `${process.env.REACT_APP_API_URL}Technician/GetAscWiseTechnician?ascCode=${asc}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                setASCWiseTecnicians(result);
            });




        // ----------------fetchbyid----------------------
        fetchdataById()


        //-----------------end-----------





        fetch(
            `${process.env.REACT_APP_API_URL}STSubStatus/GetAllSTSubStatusByType?StatusType=${acknowledgementStatus == "Customer Contacted" ? `Cust` : acknowledgementStatus == "Product received at workshop" ? `ProRec` : ``}&ActiveId=${(tab1?.serviceRequestSubStatusId == "23" || tab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "23") ? 164 : (tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") ? 163 : ""}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                // setStSubStatus(result);

                let div = ticketInfo[0]?.divisionCode == 'DR' || ticketInfo[0]?.divisionCode == 'M7'

                // console.log(div);
                if (div) {
                    let filtered = result?.filter(i => i?.stSubStatusName != "Product required at ASC")
                    // console.log(filtered);
                    if(RoleName == 'AS8'){
                        for(let j=0; j< filtered.length; j++){
                            let obj = filtered[j];
                            if(obj.stSubStatusName == "Technician Assigned"){
                                obj.stSubStatusName = "Engineer Assigned"
                            }
                        }
                    }
                    
                    setStSubStatus(filtered)
                }
                else if (!div) {
                    setStSubStatus(result)
                    // console.log(result);


                }
            });



        // --------------------------------get Submitted data-------------------------

        getSubmittedData()

        // -------------------------



        if (ticketInfo[0]?.divisionCode === 'M3') {
            fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((result) => {
                    setOptionsypeWorkDone(
                        result?.map((activity) => ({
                            value: activity?.activityId,
                            label: activity?.activityName
                        })) || []
                    );
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    // Handle the error (e.g., set an error state)
                });
        }








        fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=39&Id=0&Code=${ticketInfo[0]?.divisionCode ? ticketInfo[0]?.divisionCode : '0'}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((resultingDocumentTypes) => {
                // console.log(resultingDocumentTypes);

                setdocumentTypeList(resultingDocumentTypes)
            })











    }, [ticketInfo[0]?.divisionCode]);










    const [KVAList, setKVAList] = useState([])


    const [FrameList, setFrameList] = useState([])



    const [FrameSlots, setFrameSlots] = useState([])


    const [selectedKVA, setselectedKVA] = useState("")

    const [selectedFrameTypes, setselectedFrameTypes] = useState("")



    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=42&Id=0&Code=0`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);

                setFrameSlots(result)

            })
    }, [])



    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=40&Id=${serTicId}&Code=${tab3?.Kva}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);

                setKVAList(result)

            })



    }, [tab3?.Kva])




    useEffect(() => {
        if (tab3?.Frame) {

            fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=41&Id=${serTicId}&Code=${tab3?.Frame}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);



                    // let changedFrameList = result?.map((activity, i) => ({ label: activity?.parameterType, value: activity?.parameterType }))


                    setFrameList(result)

                })

        }


    }, [tab3?.Frame])

    useEffect(() => {


        // let frameType = selectedFrameTypes?.map(i => i?.value)?.join(",")



        fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=${selectedFrameTypes ? selectedFrameTypes : "0"}&KVAType=${selectedKVA ? selectedKVA : "0"}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setOptionsypeWorkDone(result?.map((activity) => ({ value: activity?.activityId, label: activity?.activityName })))

            })
    }, [selectedKVA, selectedFrameTypes])






    useEffect(() => {



        fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=32&Id=0&Code=0`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                setapplicationTypes(result)

            })






    }, [])




    const [Activities, setActivities] = useState([])



    const [customerData, setCustomerData] = useState(false)

    const [activity, setActivity] = useState(false)


    const [submittedDataTab1, setsubmittedDataTab1] = useState([])



    const [activityStatus, setactivityStatus] = useState([])
    const [activitySubStatus, setactivitySubStatus] = useState([])


    const [defectCategories, setdefectCategories] = useState([])
    const componentRef = useRef();


    useEffect(() => {

        fetch(
            `${process.env.REACT_APP_API_URL}ServiceTicket/GetServiceTicketSearchById?ServiceTickeId=${serTicId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                // console.log("result");
                // console.log(result);
                setticketInfo(result);
                localStorage.setItem("ticketInfo", JSON.stringify(result))

            })
    }, [customerData, activity])





    const [addActivity, setaddActivity] = useState({
        ascActivitiesId: 0,
        serviceTicketId: serTicId,
        complainType: "",
        date: DateLockCurrent,
        typeOfActivity: [],
        activeStatusId: 0,
        activeSubStatusId: 0


    });





    const [addActivityTable, setaddActivityTable] = useState({
        ascActivitiesId: 0,
        serviceTicketId: serTicId,
        complainType: "",
        date: DateLockCurrent,
        typeOfActivity: [],
        activeStatusId: 0,
        activeSubStatusId: 0



    });





    // `${process.env.REACT_APP_API_URL}Activity/GetActivityByType?ProductLineCode=${ticketInfo[0]?.productLineCode}&DivisionCode=${ticketInfo[0]?.divisionCode}&ActivityTypeId=${(tab1?.serviceRequestSubStatusId == "23" || tab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "23") ? 164 : (tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") ? 163 : ""}&StatusId=${addActivity?.activeStatusId}&SubStatusid=${addActivity?.activeSubStatusId}`,

    const [activityID, setActivityID] = useState([])

    useEffect(() => {
        if (addActivity?.activeStatusId) {

            fetch(
                `${process.env.REACT_APP_API_URL}Activity/GetActivityByType?ProductLineCode=${ticketInfo[0]?.productLineCode}&DivisionCode=${ticketInfo[0]?.divisionCode}&ActivityTypeId=${(tab1?.serviceRequestSubStatusId == "23" || tab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "23" || addActivity?.activeSubStatusId == "7" || isWorkshop) ? 164 : (tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") ? 163 : ""}&StatusId=${addActivity?.activeStatusId}&SubStatusid=${addActivity?.activeSubStatusId ? addActivity?.activeSubStatusId : '0'}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((result) => {

                    // console.log(result);
                    settab4((pre) => {
                        return {
                            ...pre,
                            activityTypeId: result[0]?.activityTypeId

                        }
                    })
                    // console.log(activityID)
                    let changedActivities = result?.map((activity, i) => ({ label: activity?.activityName, value: activity?.activityId }))
                    // console.log(changedActivities);

                    setActivities(changedActivities)
                });
        }
    }, [tab1?.serviceRequestSubStatusId == "28", tab1?.serviceRequestSubStatusId == "23", tab1?.serviceRequestSubStatusId == "30", submittedDataTab1?.serviceRequestSubStatusId == "28", submittedDataTab1?.serviceRequestSubStatusId == "23", submittedDataTab1?.serviceRequestSubStatusId == "30", addActivity?.activeSubStatusId, addActivity?.activeStatusId])





    const [verifiedWarrantyStatus, setverifiedWarrantyStatus] = useState("")
    const [invoiceBatchDate, setInvoiceBatchDate] = useState('')

    const [verifiedWarrantyFromInvoice, setverifiedWarrantyFromInvoice] = useState("")


    const handleVerify = (e) => {
        e.preventDefault();
        if (tab1?.contactDate == "" || tab1?.serialNo == "" || tab1?.productCode == "" || tab1?.invoiceNo == "" || tab1?.invoiceDate == "") {
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            })
        }

        else {
            fetch(
                `${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${tab1?.serialNo ? tab1?.serialNo : ""}&ProductCode=${tab1?.productCode ? tab1?.productCode : "0"}&InvoiceDate=${tab1?.invoiceDate ? tab1?.invoiceDate : ""}&DivisionCode=${ticketInfo[0]?.divisionCode} `,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result, 'result--------------------------')
                    // setticketInfo(result)
                    // console.log(result[0]?.warrantyStatus);
                    settab3((pre) => {
                        return {
                            ...pre,
                            ManufacturingDate: result[0]?.manufacturingDate,
                            DateOfDispatch: result[0]?.dateOfDispatch
                        }
                    })

                    if (result[0]?.msgCode === "SAP101") {
                        Swal.fire({
                            icon: "error",
                            title: result[0]?.msg
                        })
                    }
                    if (result[0]?.msgCode === "YM001") {
                        Swal.fire({
                            icon: "error",
                            title: result[0]?.msg
                        })
                    }
                    else {

                        setverifiedWarrantyStatus(result[0]?.warrantyDateStatus)
                        setInvoiceBatchDate(result[0]?.batchEndDate)
                        setverifiedWarrantyFromInvoice(result[0]?.invoiceDateStatus)
                    }


                })

        }


    };
















    // const [tab3, settab3] = useState({
    //     AscServiceTicketFIRId: 0,
    //     ServiceTicketId: serTicId,
    //     SerialNo: "",
    //     ProductCode: "",
    //     DivisionCode: "",
    //     ProductLineCode: "",
    //     ProductGroupCode: "",
    //     ProductDescription: "",
    //     BatchNo: "",
    //     InvoiceDate: "",
    //     warrantyDate: "",
    //     InvoiceFile: "",
    //     TypeOfApplication: "",
    //     NoOfHours: "",
    //     DefectList: [],
    //     FailureObservation: "",
    //     DocumentWithType: [],
    //     ClosureStatus: "",
    //     ReplacementTag: "",
    //     TypeOfWorkDone: [],
    //     DetailsOfWorkDone: "",
    //     SpareList: []
    // })


    // const handleChangeTab3 = (e) => {
    //     const newdata = { ...tab3 };
    //     newdata[e.target.name] = e.target.value;
    //     settab3(newdata);






    //     // console.log(newdata);
    // }





    // const [applicationTypes, setapplicationTypes] = useState([])



    // const [allDefects, setallDefects] = useState([])





    useEffect(() => {



        fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=32&Id=0&Code=0`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                setapplicationTypes(result)

            })







    }, [])







    // ----------------------upload photos-----------------


    const [rows, setRows] = useState([
        { label: 'Product name plate', file: null, isMandatory: true },
        { label: 'Product photo prior to repairing', file: null, isMandatory: true },
        { label: 'Product photos after repairing/correction', file: null, isMandatory: true },
    ]);



    const getValidationDocument = () => {
        const invalidRows = rows.filter(row => row.isMandatory && row.file === null);
        return invalidRows.map(row => row.label);
    };

    // // console.log(getValidationDocument, 'rows-------------------------')

    const addRow = () => {
        setRows([
            ...rows,
            { label: '', file: null, isMandatory: false }, // New row with empty label
        ]);
    };

    const removeRow = index => {
        if (!rows[index].mandatory) {
            const newRows = [...rows];
            newRows.splice(index, 1);
            setRows(newRows);
        }
    };

    const handleLabelChange = (index, event) => {
        const newRows = [...rows];
        newRows[index].label = event.target.value;
        setRows(newRows);
    };


    const handleFileChange = (index, event) => {
        // const newRows = [...rows];
        // newRows[index].file = event.target.files[0];
        // setRows(newRows);

        // // console.log(newRows);


        // settab3((pre) => {
        //     return {
        //         ...pre,
        //         DocumentWithType: newRows
        //     }
        // })



        // -----new-------


        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const updatedFile = new File(
                [selectedFile],
                `${rows[index].label}.${selectedFile.name.split('.').pop()}`,
                { type: selectedFile.type }
            );

            const updatedRows = rows.map((row, i) =>
                i === index ? { ...row, file: updatedFile } : row
            );

            setRows(updatedRows);



            settab3((pre) => {
                return {
                    ...pre,
                    DocumentWithType: updatedRows
                }
            })
        }
        // ------
    };




    // ---------upload photo end---------------------------














    // ----------spare----------------
    const [spareList, setSpareList] = useState([]);
    const [spareListDivision, setSpareListDivision] = useState([]);
    const [selectedSpare, setSelectedSpare] = useState(null);
    const [serialNumbers, setSerialNumbers] = useState({});
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const getAllSpareListDivisionWise = `${process.env.REACT_APP_API_URL}Spare/GetAllSpare?DivisionCode=${ticketInfo[0]?.divisionCode}`;
        fetch(getAllSpareListDivisionWise, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setSpareListDivision(result);
            });
    }, [tab3?.DivisionCode]);

    const formatResult = (item) => (
        <span style={{ display: 'block', textAlign: 'left' }}>{item.spareCode + '' + item.spareDescription}</span>
    );

    const handleOnSearch = (string, results) => {
        // console.log(string, results);
    };

    const handleOnHover = (result) => {
        // console.log(result);
    };

    const handleOnSelect = (item) => {
        // console.log(item);
        setSelectedSpare(item);
    };

    const handleOnFocus = () => {
        // console.log('Focused');
    };

    const spareAdd = () => {
        if (selectedSpare) {
            const newItem = {
                spareid: selectedSpare.spareid,
                // desc: selectedSpare.spareDescription,
                quantity: quantities[spareList.length] || 1,
                serialNumbers: serialNumbers[spareList.length] || []
            };
            const newItem1 = {
                spareid: selectedSpare.spareid,
                desc: selectedSpare.spareDescription,
                quantity: quantities[spareList.length] || 1,
                serialNumbers: serialNumbers[spareList.length] || []
            };



            setSpareList(prev => [...prev, newItem1]);


            settab3(prevTab3 => ({
                ...prevTab3,
                SpareList: [...prevTab3.SpareList, newItem]
            }));

            // Clear serial numbers and quantity for next entry
            setSerialNumbers(prev => ({ ...prev, [spareList.length]: [] }));
            setQuantities(prev => ({ ...prev, [spareList.length]: 1 }));

            setSelectedSpare(null); // Clear selection after adding
        } else {
            alert('Please select a spare type');
        }


        // console.log(spareList);
        // console.log(tab3);

    };

    const handleRemoveSpare = (index) => {
        setSpareList(prev => prev.filter((_, i) => i !== index));


        settab3(prevTab3 => ({
            ...prevTab3,
            SpareList: prevTab3.SpareList.filter((_, i) => i !== index)
        }));


        setSerialNumbers(prev => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
        });
        setQuantities(prev => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
        });
    };

    const handleQuantityChange = (index, value) => {
        setQuantities(prev => {
            const updated = { ...prev, [index]: value };

            // Ensure serialNumbers state is updated to match new quantity
            setSerialNumbers(prevSerials => {
                const updatedSerials = { ...prevSerials };
                const currentSerials = updatedSerials[index] || [];
                if (value > currentSerials.length) {
                    updatedSerials[index] = [...currentSerials, ...Array(value - currentSerials.length).fill('')];
                } else {
                    updatedSerials[index] = currentSerials.slice(0, value);
                }
                return updatedSerials;
            });

            // Update spareList quantity dynamically
            setSpareList(prev => {
                const updatedList = [...prev];
                if (updatedList[index]) {
                    updatedList[index].quantity = value;
                    updatedList[index].serialNumbers = serialNumbers[index] || [];
                }


                return updatedList;
            });



            settab3(prevTab3 => {
                const updatedSpareList = [...prevTab3.SpareList];
                if (updatedSpareList[index]) {
                    updatedSpareList[index].quantity = value;
                    updatedSpareList[index].serialNumbers = serialNumbers[index] || [];
                }
                return {
                    ...prevTab3,
                    SpareList: updatedSpareList
                };
            });
            return updated;
        });
    };

    const handleSerialNumberChange = (index, serialIndex, value) => {
        setSerialNumbers(prev => {
            const updated = { ...prev };
            if (!updated[index]) updated[index] = [];
            updated[index][serialIndex] = value;

            // Update spareList serialNumbers dynamically
            setSpareList(prev => {
                const updatedList = [...prev];
                if (updatedList[index]) {
                    updatedList[index].serialNumbers = updated[index];
                }
                return updatedList;
            });


            settab3(prevTab3 => {
                const updatedSpareList = [...prevTab3.SpareList];
                if (updatedSpareList[index]) {
                    updatedSpareList[index].serialNumbers = updated[index];
                }
                return {
                    ...prevTab3,
                    SpareList: updatedSpareList
                };
            });

            return updated;
        });
    };
    // -----------------spare end--------------------

    // ------------------------------------------------------ claim intigration part-----------------------------------------// 
    const [requestforYesDistance, setrequestforYesDistance] = useState(false)
    const [requestforNoDistance, setrequestforNoDistance] = useState(false)


    const [tab4Claim, settabClaim] = useState({
        ServiceTicketId: serTicId,
        activityTypeId: '',
        TypeClaim: "Deviation",
        SerialNo: '',
        ClaimNo: '',
        ParaDetail: '',
        ClaimAmount: 0,
        AttachmentType: '',
        AttachmentName: '',
        AttachmentFile: "",
        CurrentDistance: 0,
        SysDistance: 0,
        Remarks: '',
        modeOftravel: "",
        wayToDistance: '',
        ClaimDeviationTypeId: "",
        ParaValue: '',
        SysDistanceValue: "",



    })

    const handleChangetabClaim = (e) => {
        const newdata = { ...tab4Claim };
        newdata[e.target.name] = e.target.value;
        settabClaim(newdata);
        // console.log(newdata, 'new--------------------')
    }






    const [tab4Deviation, settab4Deviation] = useState({
        ServiceTicketId: serTicId,
        activityTypeId: '',
        TypeClaim: "Deviation",
        SerialNo: '',
        ClaimNo: '',
        ParaDetail: '',
        ClaimAmount: 0,
        AttachmentType: '',
        AttachmentName: '',
        AttachmentFile: "",
        CurrentDistance: 0,
        SysDistance: 0,
        Remarks: '',
        modeOftravel: "",
        wayToDistance: '',
        ClaimDeviationTypeId: "",
        ParaValue: '',
        SysDistanceValue: ""










        // Activity: "",
        // Parameter: '',
        // PossibleValue: "",
        // Rate: '',
        // ClaimAmount: "",
        // LogisticCharge: "",
        // AttachmentType: "",
        // AttachmentName: '',
        // AttachmentFile: '',
        // CurrenetDistance:claimInfo?.distance ,
        // Distance: '',
        // Remarks: ''
    })



    const [claimInfo, setClaimInfo] = useState([])

    const [activityName, setActivityName] = useState('')
    // console.log(activityName)


    const [showTable, setShowClaimTable] = useState('')




    const claimInformation = () => {
        fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimRateDetail/GetAllServiceTicketClaimRateDetail?serviceTicketId=${serTicId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result, 'claim---------------------');
                const isShow = result[0]?.isShow;



                let showDistance = false

                let shouldShowClaimTable = false;
                if (Array.isArray(isShow)) {
                    shouldShowClaimTable = isShow.some(show => show === 1);
                } else if (typeof isShow === 'number') {
                    shouldShowClaimTable = isShow === 1;
                } else {
                    console.error('Unexpected type for isShow:', isShow);
                }

                // console.log(shouldShowClaimTable);

                setShowClaimTable(shouldShowClaimTable)


                setActivityName(result[0]?.activityTypeId)




                fetch(`${process.env.REACT_APP_API_URL}Common/GetAllClaimDeviationAsync?ServiceTicketId=${serTicId}&DivisionCode=${ticketInfo[0]?.divisionCode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((resultDevClaim) => {
                        // console.log(resultDevClaim);
                        // setDevationData(result);
                        // if (activityName === 'Workshop') {
                        //     setDevationData(result);
                        //     // console.log(result);
                        // }
                        // // console.log(result[0]?.map(ele)=>ele.activityTypeId);


                        console.log(resultDevClaim);
                        const activityTypeIds = result?.map(ele => ele.activityTypeId);
                        const distanceLog = result?.map(ele => Number(ele.distance));


                        // console.log(distanceLog);

                        const disVal = distanceLog?.some(i => i > "60")


                        console.log(disVal);



                        if (activityTypeIds?.some(i => i == "163") && activityTypeIds?.some(i => i == "164")) {
                            setDevationData(resultDevClaim);
                            console.log(devationData);
                        }

                        //  if (!disVal) {
                        //     let filteredData = resultDevClaim?.filter(item => item.parameterType != 'Early Morning (7:30 AM)'
                        //     );
                        //     setDevationData(filteredData);
                        //      console.log(filteredData);

                        // }


                        else if (activityTypeIds?.some(i => i == "163")) {
                            let filteredData = resultDevClaim?.filter(item => item.parameterType != 'Logistic Charges');
                            // let filteredData = resultDevClaim?.filter(item =>
                            //     item.parameterType != 'Early Morning (7:30 AM)' &&
                            //     item.parameterType != 'Logistic Charges'
                            // );
                            setDevationData(filteredData);
                            console.log(filteredData);
                        } else if (activityTypeIds?.some(i => i == "164")) {
                            let filteredData = resultDevClaim?.filter(item =>
                                item.parameterType != 'Early Morning (7:30 AM)' &&
                                item.parameterType != 'Changes in distance'
                            );
                            setDevationData(filteredData);
                            console.log(filteredData);

                        }



                        else {
                            setDevationData(resultDevClaim);

                        }
                    })
                    .catch((error) => console.error('Error fetching data:', error));

                setClaimInfo(result)
                settab4Deviation((pre) => {
                    return {
                        ...pre,
                        SerialNo: result[0]?.serialNo,
                        SysDistance: result[0]?.distance,
                        activityTypeId: result[0]?.activityTypeId ? '163' : '164'
                    }


                })
                settab4(result)


            })

    }

    useEffect(() => {
        claimInformation()
    }, [ticketInfo[0]?.divisionCode])

    const [tab4, settab4] = useState([])


    const handleChangetab4Deviation = (e) => {
        const newdata = { ...tab4Deviation };
        newdata[e.target.name] = e.target.value;
        settab4Deviation(newdata);
        console.log(newdata, 'new--------------------')
    }


    // const [deviationEarlyMorning, setDeviationEarlyMorning] = useState({
    //     ClaimAmount: "",
    //     breakfastDescription: ""

    // })

    // // console.log(deviationEarlyMorning)




















    const isDistanceAbove30 = Number(tab4Deviation?.CurrentDistance) > 60;
    const isDistanceAbove60 = Number(tab4Deviation?.CurrentDistance) > 120;
    const isDistanceAbove100 = Number(tab4Deviation?.CurrentDistance) > 100;






    // console.log(isDistanceAbove30, 'distance---------------')


    const [tableDataDeviation, setTableDataDeviation] = useState([]);

    const handleSaveLogstic = () => {
        setTableDataDeviation(prevData => [...prevData, tab4Deviation]);
        handleLogsticClose();
    };



    const [devationData, setDevationData] = useState([])












    const handleSubmitClaim = () => {
        // console.log(tab4);

        if (tab4?.some(i => i?.isValueEditable == "1" && i?.paraValue < 1)) {
            Swal.fire({
                icon: "error",
                title: "Please add Highlighted possible value!",
                text: "Should not be 0 !"
            })
        }
        else {

            fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimInfo/UpsertServiceTicketClaimInfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(tab4)

            })
                .then((res) => {
                    let resp = res.text()
                    resp.then((r) => {
                        // console.log(r);
                        let regextest = /^[a-zA-Z0-9]+$/;
                        if (!r.match(regextest)) {
                            const errorData = JSON.parse(r);
                            // console.log('errorData-------------', errorData);
                            if (errorData && errorData.title === "One or more validation errors occurred.") {
                                // Construct error message from the error object
                                let errorMessage = "";
                                for (const key in errorData.errors) {
                                    errorMessage += `${errorData.errors[key][0]}\n`;
                                }
                                Swal.fire({
                                    icon: "error",
                                    title: errorMessage
                                });
                            }
                        }
                        else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Submitted successfully!'
                            });
                            navigate(`${pathName}/service-request`)

                        }
                    })


                })
                .catch(error => {
                    console.error('Error:', error);  // Log any errors that occur
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: 'An unexpected error occurred.'
                    });
                });

        }




    }

    // -----------------------------------------------------------end Integration part---------------------------------------------------------/












    const [active, setactive] = useState(null)
    const [activeKeyEdit, setactiveKeyEdit] = useState('0')
    const ViewTic = localStorage.getItem('viewTicket')
    const [saved, setSaved] = useState(false);
    const [requestForSiteVisit, setRequestForSiteVisit] = useState(false);
    const [requestForProduct, setRequestForProduct] = useState(false);
    const [warrantyAccordion, setWarrantyAccodrion] = useState(false)
    const [warrantyDecision, setwarrantyDecision] = useState(false)
    const [claim, setClaim] = useState(false)


    const [serviceTasks, setServiceTasks] = useState(false)
    const [requestForyesWarranty, setRequestForYesWarranty] = useState(false)
    const [requestFornoWarranty, setRequestForNoWarranty] = useState(false)
    const [requestForCGInvoice, setRequestForCGInvoice] = useState(false)
    const [requestForSubmit, setRequestForSubmit] = useState(false)
    const [serialNo, setserialNo] = useState('')
    const [selectedValueTicket, setSelectedValueTicket] = useState('');



    const handleSelect = (eventKey) => {
        // // console.log(_.isEmpty(submittedDataTab1));
        // // console.log(submittedDataTab2);
        // // console.log(submittedDataTab3);

        // // console.log(submittedDataTab2?.includes());
        // setactiveKeyEdit(eventKey);
        const hasWorkCompleted = submittedDataTab2?.some(activity => activity.statusName == "Work Completed");



        if (eventKey == "0") {

            setactiveKeyEdit(eventKey);
        }
        else if (eventKey == "1" && (!(lodash.isEmpty(submittedDataTab1)))) {
            setactiveKeyEdit(eventKey);

        }
        else if (eventKey == "2" && (!(lodash.isEmpty(submittedDataTab2))) && hasWorkCompleted) {
            setactiveKeyEdit(eventKey);

        }
        else if (eventKey == "3" && (!(lodash.isEmpty(submittedDataTab3)))) {
            setactiveKeyEdit(eventKey);

        }
        else {
            return ''
        }

    };

    const CustomerConnected = {
        Contactdate: '',
        ConnectTime: '',
        Commment: "",
        ticketReject: '',
        Comment_two: ""
    }


    const [dateshow, setDateshow] = useState(false)

    const [showProductInfo, setShowProductInfo] = useState(false)

    const handleShowProductInfo = () => {
        setShowProductInfo(true)
    }
    const handleCloseProductinfo = () => {
        setShowProductInfo(false)

    }

    const [showRequestInfo, setShowRequestInfo] = useState(false)

    const handleShowRequestInfo = () => {
        setShowRequestInfo(true)
    }
    const handleCloseServiceRequest = () => {
        setShowRequestInfo(false)
        navigate(`${pathName}/service-request`)

    }

    const [minInvoiceDate, setMinInvoiceDate] = useState('');










    useEffect(() => {
        setactive(null)

    }, [])
    const handleSaveData = () => {
        setSaved(true);
        setactiveKeyEdit('2')

    }

    const [customerConnected, setcustomerConnected] = useState(false)
    const [alreadyWorkshoop, setalreadyWorkshoop] = useState(false)

    const [workshopremarks, setworkshopremarks] = useState('')

    const handleRadioCustomerChange = (event) => {
        const { value } = event.target;

        if (value === 'customer') {
            setcustomerConnected(true);
            setalreadyWorkshoop(false);
            setserialNo('')
            setVerifiedProduct(false)
        } else if (value === 'workshop') {
            setcustomerConnected(false);
            setalreadyWorkshoop(true);
            setserialNo('')
            setVerifiedProduct(false)
        } else {
        }
    };

    const handleRadioChange = (event) => {
        const { value } = event.target;

        if (value === 'site') {
            setRequestForSiteVisit(true);
            setRequestForProduct(false);
            setDateshow(false)

        } else if (value === 'Product') {
            setRequestForSiteVisit(false);
            setRequestForProduct(true);
            setVerifiedWork(false)



        } else {
        }
    };
    const handleRadioYesChange = (event) => {
        const { value } = event.target;
        if (value === 'yes') {
            setRequestForYesWarranty(true);
            setRequestForNoWarranty(false);
        } else if (value === 'no') {
            setRequestForNoWarranty(false);
            setRequestForYesWarranty(true);
        } else {
        }
    };
    const handleRadioInvoiceChange = (event) => {
        const { value } = event.target;

        if (value === 'yes') {
            setRequestForCGInvoice(true);
            setRequestForSubmit(false);
        } else if (value === 'no') {
            setRequestForSubmit(false);
            setRequestForCGInvoice(true);
        } else {
        }
    };
    const [workShop, setworkShop] = useState(false)
    const [closeTic, setcloseTic] = useState(false)
    const handleRadioWorkshopChange = (event) => {
        const { value } = event.target;

        if (value === 'recevied') {
            setworkShop(true);
            setcloseTic(false);
        } else if (value === 'close') {
            setworkShop(false);
            setcloseTic(true);
        } else {
        }
    };


    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [selectedDateSite, setSelectedDateSite] = useState(getCurrentDate());
    const [selectedDateContact, setSelectedDateContact] = useState(getCurrentDate());
    const [selectedTime, setSelectedTime] = useState('');

    const [selectedDateWorkShop, setSelectedDateWorkShop] = useState(getCurrentDate());
    const [selectedTypeWorkDone, setSelectedTypeWorkDone] = useState('')
    const [selectedClousureStatus, setSelectedClousureStatus] = useState('')






    const [workCompleted, setworkCompleted] = useState(false)
    const [productWork, setproductWork] = useState(false)
    const [showRadioButtons, setShowRadioButtons] = useState(false); // State to control visibility of radio buttons

    const handleRadioWorkChange = (event) => {
        const { value } = event.target;
        if (value === 'Work Completed') {
            setworkCompleted(true);
            // setproductWork(false);

        } else if (value === 'ProductWork ') {
            setworkCompleted(false);
            // setproductWork(true);



        } else {
        }
    };

    const [currentProduct, setCurrentProduct] = useState([]);

    useEffect(() => {
        // Set static data to state (simulate fetch from API)
        const staticProductInfo = {
            productSerial: 'WCBM10134',
            pCode: '132TEFC',
            Pdescrription: '10.45kW 6POLE TEFC SCR MOTOR (MCP-RLY) (10.45KZ6-MCP) ',
            Batchno: '2',
            serialRequest: '208978979',
            InvoiceNo: '310759246',
            invoiceDate: '12/12/2023',
            requestDate: '11/07/2024',
            location: 'Yashodha Nagar, Chennai',
            companyName: 'Reliance Industry',
            divisionName: 'LT Motors',
            productLine: 'M3-DC Machines (DD)',
            productGroup: 'DC MACHINES',
            status: 'In Warranty',
            natureOfComplaint: 'Breakdown',
            ageOfpendency: '1',
            distnace: '2',
            issueType: 'open',
            assignTech: 'No',
            ascName: 'Patil Electric Works',
            branch: 'Mumbai',
        }

        // Set product info to state
        // setProductInfo(staticProductInfo);

        // Optionally set a default product (for demonstration purposes)
        setCurrentProduct(staticProductInfo);

        // Set current date for date max value

    }, []);

    // const [addContacted, setAddContacted] = useState({
    //     contactDate: selectedDateContact,
    //     ConnectTime: '',
    //     Commment: '',
    //     ticketReject: '',
    //     Comment_two: ""
    // })
    const [tab2Data, settab2Data] = useState({
        ServiceDate: "",
        AssignTechician: "",
        ProductReceivedDate: "",
        ProductReceviedASCDate: "",
        ProductReceviedType: "",
        Remarks: "",
        RemarksR: "",

    });
    const [addSaveContacted, setAddSaveContacted] = useState({
        contactDate: "",
        serialNumber: '',
        InvoiceDate: '',
        InvoiceNo: '',
        uploadInvoice: null,
        serviceRequestStatus: '',
        warranty: '',
        remarks: ''

    })
    const [verifiedProduct, setVerifiedProduct] = useState(false);
    const [verifiedWork, setVerifiedWork] = useState(false);


    // const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format

    const customerhandleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];  // Assuming single file selection
    //     setAddContacted(prevState => ({
    //         ...prevState,
    //         uploadInvoice: file
    //     }));
    // };

    const [addContacted, setAddContacted] = useState({
        AscCustomerContactedId: 0,
        ServiceTicketId: "",
        TypeService: "",
        ContactDate: '',
        SerialNo: "",
        ProductCode: "",
        InvoiceDate: "",
        InvoiceNo: "",
        Remarks: "",
        ServiceRequestStatusId: "",
        ServiceRequestSubStatusId: "",
        InvoiceDocFile: "",
        ServiceTicketStatus: "",
        AscActivitiesName: [],
    });





    const calculateDateAfterAddDays = () => {
        const selected = new Date(selectedDate);
        selected.setDate(selected.getDate() + 5);

        const year = selected.getFullYear();
        let month = (selected.getMonth() + 1).toString();
        let day = selected.getDate().toString();

        if (month.length === 1) {
            month = '0' + month;
        }

        if (day.length === 1) {
            day = '0' + day;
        }
        return `${day}/${month}/${year}`;
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = reject
        })
    }
    const getFileNameFromURL = (url) => {
        const path = url.split('/'); // Split URL by '/'
        return path[path.length - 1]; // Get the last part of the URL as filename
    };

    const [selectedCancelRequest, setSelectedCancelRequest] = useState('');
    const [selectedCloseRequest, setSelectedCloseRequest] = useState('');
    const [selectedCustomerRequest, setSelectedCustomerRequest] = useState('');
    const [selectedProductRequest, setSelectedProductRequest] = useState('');
    const [selectedAssignRequest, setSelectedAssignRequest] = useState('')
    const [techList, setTechList] = useState('')


    const [addFirdata, setAddFirData] = useState({
        productSrNumber: '',
        division: '',
        productLine: "",
        productGroup: "",
        productCode: '',
        productDescription: "",
        batchNo: "",
        invoiceNo: '',
        invoiceDate: '',
        warrantyDate: '',
        invoiceCopy: "",
        typeofApplication: "",
        totalNoHours: '',
        failureObservation: "",
        defectCategory: '',
        subDefect: '',
        serialNumberSticker: '',
        installtionCondition: "",
        electricalCondition: '',
        clousurStatus: '',
        replaceTag: "",
        detailsWorkDone: '',
        typeOfworkDone: [],
        spare: '',
        repairASC: ''
    })
    const handleChangeFir = (e) => {
        const newdata = { ...addFirdata };
        newdata[e.target.name] = e.target.value;
        setAddFirData(newdata);
        // console.log(newdata);
    };


    // const ServiceRequest = {
    //     Close: "Close",
    //     Cancelled: 'Cancelled',
    //     CUSTOMER_NEGLIGENCE: "CUSTOMER NEGLIGENCE",
    // }

    const ServiceRequest = {
        Cancelled: "Cancelled",
        Close: "Closed at intial stage",
        Customer: "Customer negligence",
        Product: "Product required at workshop",
        site: 'Site visit planned'

    };
    const ServiceRequest2 = {
        Cancelled: "Cancelled",
        Close: "Closed at intial stage",
        Customer: "Customer negligence",
        Product: "Product required at workshop",
        // site: 'Site visit planned'

    };
    const Cancelled = {
        not: "Not a CG product",
        Cancelled: 'Out of warranty – customer not ready to pay',
        CUSTOMER_NEGLIGENCE: "Problem not related to CG product",
        tech_not_allowed: 'Technician not available'


    }
    const Closed = {
        Resolved: "Resolved on phone call",

    }

    const Customer = {
        Customer_not: "Customer not ready to pay - ticket closed",
        Customer: "Customer ready to pay as OOW",

    }
    const product = {
        product: "Product to be received at workshop",

    }
    const assignTech = {
        Tech: "Assign technician",

    }
    const assignTechList = {
        Tech1: "Ajay",
        Tech1: "Vijay",


    }
    const [selectedServiceRequest, setSelectedServiceRequest] = useState('');
    // const [selectedDivision, setSelectedDivision] = useState('')

    const handleServiceRequestChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedServiceRequest(selectedValue);
    };
    const handleServiceCancelChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCancelRequest(selectedValue);

        // console.log(selectedValue, '-------------')
    };
    const handleServiceCloseChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCloseRequest(selectedValue);
        // console.log(selectedValue, '-------------')
    };
    const handleServiceCustomerChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCustomerRequest(selectedValue);
        // console.log(selectedValue, '-------------')
    };
    const handleServiceProductChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedProductRequest(selectedValue);
        // console.log(selectedValue, '-------------')
    };
    const handleServiceAssignChange = (event) => {
        const selectedValue = event.target.value;
        setTechList(selectedValue);
        // console.log(selectedValue, '-------------')
    };
    const handleServiceAssignListChange = (event) => {
        const selectedValue = event.target.value;
        // setTechList(selectedValue);
        // console.log(selectedValue, '-------------')
    };


    // Get current date in ISO format (YYYY-MM-DD)
    // const currentDate = new Date().toISOString().split('T')[0];

    // Get current time in HH:mm format
    const getCurrentTime = () => {
        const today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        // Pad hours and minutes with leading zeros if necessary
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    };

    const currentTime = getCurrentTime();
    // let requestDate = localStorage.getItem("requestDate").split("/");


    // let reqDate = requestDate[2] + "-" + requestDate[0] + "-" + requestDate[1]

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionYes, setSelectedOptionYes] = useState('');
    const [selectedOptionYES, setSelectedOptionYES] = useState(''); // State to track selected option
    // State to track selected option
    // State to track selected option
    const [submitVisible, setSubmitVisible] = useState(false);

    const [invoiceNumber, setInvoiceNumber] = useState('');   // State to manage invoice number
    const [invoiceDate, setInvoiceDate] = useState('');       // State to manage invoice date
    const [invoiceFile, setInvoiceFile] = useState('')

    // State to track which submit button to show

    const handleOptionClick = (option) => {
        setSelectedOption(option);

        if (option === 'yes') {
            setSubmitVisible(true); // Show "Submit" button
        } else if (option === 'no') {
            setSubmitVisible(false); // Show "Submit for CG Approval" button
        }
    };
    const handleOptionClickYes = (option) => {
        setSelectedOptionYes(option);
        if (option === 'yes') {
            // Set default values for invoice number and date
            setInvoiceNumber('202411004-1425');
            setInvoiceDate(getTodayDate()); // Set today's date as default

            setInvoiceFile(''); // Reset invoice file field
        } else {
            // Reset invoice number, date, and file
            setInvoiceNumber('');
            setInvoiceDate('');
            setInvoiceFile(''); // Initialize invoice file field
        }
    };
    const handleOptionClickYES = (option) => {
        setSelectedOptionYES(option);
        if (option === 'yes') {

        } else {

        }
    };
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        return `${year}-${month}-${day}`;
    };

    const customValueRenderer = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => label).join(", ")
            : "Select...";
    };
    // const options = [
    //     { label: "Only site visit", value: "Only site visit" },
    //     { label: "Site visit & repair done", value: "Site visit & repair done" },
    //     { label: "Repair at ASC", value: "Repair at ASC" },
    //     { label: "Bearing replacement at site", value: "Bearing replacement at site" },
    //     { label: "Bearing replacement at ASC", value: "Bearing replacement at ASC" },
    //     { label: "Other repair at ASC", value: "Other repair at ASC" },
    //     { label: "First level repair", value: "First level repair" },
    //     { label: "Second level repair", value: "Second level repair" },
    // ];


    // const myJSON = JSON.stringify(obj);

    const [typeOfWorkdown, setTypeofWorkdown] = useState([]);
    const TaskStatus = {
        Pending_work: "Pending work",
        Product_at_ASC: "Product at ASC",
        Spares_pending: "Spares pending",
        Revisit_pending: "Revisit required ",
        Work_completed: "Work completed ",
        Work_void: "Work void ",


    };
    const TaskStatuss = {
        visit: 'Visit done (Inspection)',
        rewinding: 'Rewinding',
        first_level: 'First level repair',
        second_level: 'Second level repair',
        Visit_done: 'Visit Done, Product to be picked up.'



    };






    // console.log(addActivityItenTable, 'table----------')

    const [actionButton, setActionButton] = useState(true)



    const handleRemoveRow = (indexToRemove) => {
        // Filter out the row that matches the index
        const updatedTable = addActivityItenTable.filter((_, index) => index !== indexToRemove);
        const updatedTable1 = addActivityIten.filter((_, index) => index !== indexToRemove);
        setaddActivityItenTable(updatedTable);
        setaddActivityIten(updatedTable1)
    };




    useEffect(() => {
        if (addActivity?.typeOfActivity.length > 0) {
            // console.log(addActivity?.typeOfActivity.map(item => item.value));
        } else {
            // console.log('No items selected');
        }



        if (addActivityTable?.typeOfActivity.length > 0) {
            // console.log(addActivityTable?.typeOfActivity.map(item => item.value));
        } else {
            // console.log('No items selected');
        }
    }, [addActivity?.typeOfActivity]);

    const [addDefectCategoryOption, setAddDefectCategoryOption] = useState({
        defectCategoryId: "",
        defectId: "",
    });
    const [addDefectCategoryOptionTable, setAddDefectCategoryOptionTable] = useState({
        defectCategoryItem: "",
        defectItem: "",
    });
    const [defectList, setDefectList] = useState([]);
    const [defectListTable, setDefectListTable] = useState([]);


    const handleRemoveButtonClick = (index) => {
        const updatedData = [...defectList];
        const updatedData1 = [...defectListTable];
        updatedData.splice(index, 1);
        updatedData1.splice(index, 1);
        setDefectList(updatedData);
        settab3((pre) => {
            return {
                ...pre,
                DefectList: updatedData
            }
        })
        setDefectListTable(updatedData1)
    };







    const handleAddActivityItem = () => {

        // let ispresent=addActivityItenTable?.some(activityitem=>activityitem?.status)


        // if (addActivity?.date === '' || addActivity?.activeStatusId === '') {
        //     Swal.fire({
        //         icon: "error",
        //         title:
        //             "Please fill all the fields marked with red *!",
        //     });
        // }
        // // else if(){

        // // }
        // else {
        //     const Datef = (date) => moment(date, ['YYYY-MM-DD', 'DD-MM-YYYY']).format('YYYY-MM-DD');
        //     const addActivityDateF = Datef(addActivity.date);
        //     const startDateExists = addActivityIten.some(item => Datef(item.date) === addActivityDateF);
        //     const startDateExistsTable = addActivityItenTable.some(item => Datef(item.date) === addActivityDateF);




        // const startDateExists = addActivityIten.some(item => moment(item.date).format('dd-MM-YYYY') == addActivity.date);
        // const startDateExistsTable = addActivityItenTable.some(item => item.date == addActivity.date);



        // const newActivityList = addActivityIten.map(item => ({
        //     ...item,
        //     typeOfActivity: item.typeOfActivity.map(activity => activity.value).join(','),
        //     complainType
        // }));

        // // console.log(startDateExists,'date------------------')
        // console(startDateExistsTable,'date')

        // if (startDateExists || startDateExistsTable) {
        //     alert('Date already exists. Please choose a different  date.');
        //     return;
        // }
        //     setaddActivityIten([...addActivityIten, addActivity]);
        //     setaddActivityItenTable([...addActivityItenTable, addActivityTable]);
        //     // if (addActivity?.date && ) {
        //     //     const diff = calculateDateDifference(addActivity.activityStartDate, addActivity.activityEndDate);
        //     //     setDateDifference(diff);
        //     // }


        //     // console.log(addActivityIten);
        //     // console.log(addActivityItenTable);

        //     setaddActivity({
        //         ascActivitiesId: 0,
        //         serviceTicketId: serTicId,
        //         complainType: (tab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "28") ? "Workshop" : (tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") ? "Field" : "",
        //         date: '',
        //         typeOfActivity: [],
        //         activeStatusId: 0,
        //         activeSubStatusId: 0,





        //     })



        //     setaddActivityTable({
        //         ascActivitiesId: 0,
        //         serviceTicketId: serTicId,
        //         complainType: (tab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "28") ? "Workshop" : (tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") ? "Field" : "",
        //         date: '',
        //         typeOfActivity: [],
        //         activeStatusId: 0,
        //         activeSubStatusId: 0





        //     })
        //     // setaddActivity(initialActivityState); // Reset addActivity to initial state
        //     if (addActivity.activeStatusId === 'Work_completed') {
        //         setSubmitEnabled(true);
        //     } else {
        //         setSubmitEnabled(false);
        //     }




        // }










        // setactiveKeyEdit('2')
        // if(addActivityIten?.length>0){


        const complainType =
            tab1?.serviceRequestSubStatusId === "28" ||
                submittedDataTab1?.serviceRequestSubStatusId === "28" || acknowledgementStatus == "Product received at workshop"
                ? "Workshop"
                : tab1?.serviceRequestSubStatusId === "30" ||
                    submittedDataTab1?.serviceRequestSubStatusId === "30" || acknowledgementStatus == "Customer Contacted"
                    ? "Field"
                    : "";

        const newActivityList = [{
            ...addActivity,
            typeOfActivity: addActivity.typeOfActivity?.map(activity => activity.value).join(','),
            complainType
        }];

        // console.log(newActivityList);



        const targetDate = new Date('2024-01-01');

        const newActivityListDate = newActivityList.filter(item => {
            const itemDate = new Date(item?.date);
            return itemDate >= targetDate;
        });



        // // console.log(dateLock,'date------------------')








        fetch(`${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpsertAscServiceTicketActivity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newActivityList)

        })
            .then((res) => {
                let resp = res.text()
                resp.then((r) => {
                    // console.log(r, '------------------');
                    // console.log(newActivityList, 'new----------------');

                    let regextest = /^[a-zA-Z0-9]+$/;


                    if (r == "Completed") {
                        const nextKey = (parseInt(activeKeyEdit) + 1).toString();
                        if (nextKey <= '3') { // Ensure it doesn't go beyond the last item
                            setactiveKeyEdit(nextKey);
                        }




                        setActivity(true)
                        setActionButton(false)
                        setaddActivityIten([])
                        setaddActivityItenTable([])
                        getSubmittedData()
                        fetchdataById()
                    }
                    else if (r == "ActivityExists") {
                        Swal.fire({
                            icon: "warning",
                            title: "Status / Activity already submitted!"
                        })

                        setActivities([])

                        let actForm = document.getElementById("activityForm")

                        actForm.reset()

                        setaddActivity((pre) => {
                            return {
                                ...pre,
                                typeOfActivity: [],
                                date: "",
                                activeStatusId: 0

                            }
                        })



                        setactivitySubStatus([])

                    }
                    else if (r.match(regextest)) {
                        // console.log("Work not completed");
                        setaddActivityIten([])
                        setaddActivityItenTable([])
                        setActivities([])

                        getSubmittedData()

                        const newDateLock = newActivityListDate[0]?.date;
                        setDateLock(newDateLock);
                        // console.log(tab1?.contactDate, '0-----')
                        // console.log(newDateLock, '---------------')



                        let actForm = document.getElementById("activityForm")

                        actForm.reset()

                        setaddActivity((pre) => {
                            return {
                                ...pre,
                                typeOfActivity: [],
                                date: "",
                                activeStatusId: 0
                            }
                        })


                        setactivityStatus([])
                        setactivitySubStatus([])

                    }

                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!"
                        })


                        let actForm = document.getElementById("activityForm")

                        actForm.reset()


                        setaddActivity((pre) => {
                            return {
                                ...pre,
                                typeOfActivity: [],
                                date: "",
                                activeStatusId: 0

                            }
                        })


                        setactivityStatus([])
                        setactivitySubStatus([])


                    }



                }
                )
            }
            )




        // }








    }
    // useEffect(() => {
    //     // console.log(addActivityIten);
    //     // console.log(addActivityItenTable);

    //     // Log updated addActivityIten whenever it changes
    // }, [addActivityIten, addActivityItenTable]);
    // // console.log(addActivityIten);F   

    // const handleRemoveButtonClick = (index) => {
    //     const updatedData = [...defectList];
    //     updatedData.splice(index, 1);
    //     setDefectList(updatedData);
    // };

    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [dateDifference, setDateDifference] = useState(null);

    const activy = addFirdata?.typeOfworkDone.map((val) => val.value)


    // console.log(activy, 'hello')
    // const CliamList = addActivityIten?.map((val) => val.typeOfActivity)
    // let flattened = CliamList?.flat()
    // // console.log(flattened, '-----------pavan')

    const calculateDateDifference = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInTime = end.getTime() - start.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 1200 * 24));

        return differenceInDays;
    };

    // useEffect(() => {
    //     if (addActivity?.activityStartDate && addActivity?.activityEndDate) {
    //         const diff = calculateDateDifference(addActivity.activityStartDate, addActivity.activityEndDate);
    //         setDateDifference(diff);
    //     }
    // }, [addActivity.activityStartDate, addActivity.activityEndDate]);



    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setCurrentProduct(prevProduct => ({
    //         ...prevProduct,
    //         [name]: value
    //     }));
    // };

    const handleAddDefect = () => {


        let isPresent = defectListTable?.some(defect =>
            defect.defectCategoryItem == addDefectCategoryOptionTable.defectCategoryItem &&
            defect.defectItem == addDefectCategoryOptionTable.defectItem
        );

        // console.log(isPresent);



        if (addDefectCategoryOption?.defectCategoryId == "") {
            Swal.fire({
                icon: "error",
                title: "Defect category is required"
            })
        }


        else if (addDefectCategoryOption?.defectId == "") {
            {
                Swal.fire({
                    icon: "error",
                    title: "Defect sub category is required"
                })

            }

        }
        else if (isPresent) {
            Swal.fire({
                icon: "error",
                title: "Defect already added!"
            })

            setAddDefectCategoryOption({
                defectCategoryId: "",
                defectId: "",
            });
            setAddDefectCategoryOptionTable({
                defectCategoryItem: "",
                defectItem: "",
            });
        }
        else {
            setDefectList([...defectList, addDefectCategoryOption]);
            settab3((pre) => {
                return {
                    ...pre,
                    DefectList: [...defectList, addDefectCategoryOption]
                }
            })
            setDefectListTable([...defectListTable, addDefectCategoryOptionTable]);

            setAddDefectCategoryOption({
                defectCategoryId: "",
                defectId: "",
            });
            setAddDefectCategoryOptionTable({
                defectCategoryItem: "",
                defectItem: "",
            });
        }
        // console.log(defectList);
        // console.log(defectListTable);

        // console.log(tab3);

    };
    //   const handleRemoveButtonClick = (index) => {
    //     const updatedData = [...defectList];
    //     updatedData.splice(index, 1);
    //     setDefectList(updatedData);
    //   };

    //   const customValueRenderer = (selected, _options) => {
    //     return selected.length
    //       ? selected.map(({ label }) => label).join(", ")
    //       : "Select...";
    //   };
    const options = [

        // {
        //     label: "Visit at Site",
        //     value: "Visit at Site",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '600Rs',
        //     Reason: ''



        // },
        // {
        //     label: "Repair Charges at Site-Bearing Replacement.",
        //     value: "Repair Charges at Site-Bearing Replacement.",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '900Rs',
        //     Reason: ''
        // },
        // {
        //     label: "Repair Charges at Site-Bearing Replacement.",
        //     value: "Repair Charges at Site-Bearing Replacement.",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '600Rs',
        //     Reason: ''
        // },
        // {
        //     label: "Compensation for Carrying out Repair Job at ASC Workshop", value: "Compensation for Carrying out Repair Job at ASC Workshop",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '1200Rs',
        //     Reason: ''
        // },
        { label: "Repair Job at ASC Workshop", value: "Repair Job at ASC Workshop " },
        {
            label: "Rewinding ",
            value: "Rewinding",
            Units: 'Type',
            SubUnits: 'Type',
            total: 'Type',
            Remarks: '',
            stdAmount: '1200Rs',
            Reason: ''
        },

    ];
    const optionsSite = [

        {
            label: "Visit at Site",
            value: "Visit at Site",
            Units: 'Type',
            SubUnits: 'Type',
            total: 'Type',
            Remarks: '',
            stdAmount: '600Rs',
            Reason: ''



        },
        {
            label: "Repair Charges at Site-Bearing Replacement.",
            value: "Repair Charges at Site-Bearing Replacement.",
            Units: 'Type',
            SubUnits: 'Type',
            total: 'Type',
            Remarks: '',
            stdAmount: '900Rs',
            Reason: ''
        },
        // {
        //     label: "Repair Charges at Site-Bearing Replacement.",
        //     value: "Repair Charges at Site-Bearing Replacement.",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '600Rs',
        //     Reason: ''
        // },
        // {
        //     label: "Compensation for Carrying out Repair Job at ASC Workshop-Alternators ", value: "Compensation for Carrying out Repair Job at ASC Workshop-Alternators ",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '1200Rs',
        //     Reason: ''
        // },
        // { label: "Compensation for Carrying out Repair Job at ASC Workshop --Motors", value: "Compensation for Carrying out Repair Job at ASC Workshop --Motors" },
        // {
        //     label: "Rewinding ",
        //     value: "Rewinding",
        //     Units: 'Type',
        //     SubUnits: 'Type',
        //     total: 'Type',
        //     Remarks: '',
        //     stdAmount: '1200Rs',
        //     Reason: ''
        // },

    ];

    // const optionsypeWorkDone = [
    //     { label: "Spare consumption", value: "Spare consumption" },
    //     // {label:,value:}
    //     { label: "Painting & finishing (B48 & B42 frame)", value: "Painting Charges (B48 & B42 frame)" },

    // ];

    const [uploadPhoto, setUploadPhoto] = useState({
        label: '',
        filee: ""
    });
    const [fileInputs, setfileInputs] = useState([]);

    const [typeSelected, setTypeSelected] = useState('')


    const addFileInput = () => {
        setfileInputs([...fileInputs, uploadPhoto]);
        // console.log(...fileInputs, uploadPhoto, '----------add')

    };
    const handleRemovefile = (index) => {
        const updatedfile = [...fileInputs];
        updatedfile.splice(index, 1);
        setfileInputs(updatedfile);
        // console.log(index)
    };
    const [typeSelectedSpare, setTypeSelectedSpare] = useState('')




    const [activityList, setActivityList] = useState([]);
    const [activityUpload, setActiviityUpload] = useState([{
        desc: '',
        qun: "",
        activity: ''
    }]);
    const activityAdd = () => {
        if (typeSelected) {
            setActivityList([
                ...activityList,
                { type: typeSelected, desc: '', quantity: 1 }
            ]);
            setTypeSelected(''); // Clear selection after adding
        } else {
            alert('Please select an activity type');
        }
    };

    // // console.log(addActivity?.date, 'date------------')

    // const spareAdd = () => {
    //     if (selectedSpare) {
    //         setSpareList([
    //             ...spareList,
    //             { type: selectedSpare?.name, desc: '', quantity: 1 }
    //         ]);
    //         setSelectedSpare(null); // Clear selection after adding
    //     } else {
    //         alert('Please select an spare type');
    //     }
    // };
    const handleRemoveActivity = (index) => {
        const updatedActivity = [...activityList];
        updatedActivity.splice(index, 1);
        setActivityList(updatedActivity);
        // console.log(index)
    };

    // const [file, setFile] = useState();
    const handleFIRSubmit = () => {
        if (addFirdata?.productSrNumber === '' || addFirdata?.division === '' || addFirdata?.productLine == '' || addFirdata?.productGroup == '' || addFirdata?.productCode == '' || addFirdata?.productDescription == '' || addFirdata?.batchNo == '' || addFirdata?.invoiceNo == '' || addFirdata?.invoiceDate == '' || addFirdata?.warrantyDate == '' || addFirdata?.typeofApplication == '' || addFirdata?.totalNoHours == '' || addFirdata?.failureObservation == '' || addFirdata?.serialNumberSticker == '' || addFirdata?.installtionCondition == '' || addFirdata?.electricalCondition == '' || addFirdata?.clousurStatus == '' || addFirdata?.detailsWorkDone == '' || addFirdata?.typeOfworkDone == '') {
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            })
        }
        else if (defectList.length == 0) {
            Swal.fire({
                icon: "error",
                title: "Please add defect   "
            })

        }
        else {
            alert('data saved suceefull')



        }
    }


    //   const handleChange2 = (e) => {
    //     const newdata = { ...addFirdata };
    //     newdata[e.target.name] = e.target.value;
    //     setAddFirData(newdata);
    //     // console.log(newdata);
    //   };
    // const [addFirdata, setAddFirData] = useState({
    //     productSrNumber: '',
    //     division: '',
    //     productLine: "",
    //     productGroup: "",
    //     productCode: '',
    //     productDescription: "",
    //     batchNo: "",
    //     invoiceNo: '',
    //     invoiceDate: '',
    //     warrantyDate: '',
    //     invoiceCopy: "",
    //     typeofApplication: "",
    //     totalNoHours: '',
    //     failureObservation: "",
    //     defectCategory: '',
    //     subDefect: '',
    //     serialNumberSticker: '',
    //     installtionCondition: "",
    //     electricalCondition: '',
    //     clousurStatus: '',
    //     replaceTag: "",
    //     detailsWorkDone: '',
    //     typeOfworkDone: [],
    //     spare: '',
    //     repairASC: ''
    //   })

    // const initialActivities = [
    //     { id: 0, name: '130021029W	FAN M/CED CI D/E 112-147C Q652 OLD' },
    //     { id: 1, name: '130021401W	BRG. COVER M/CED C112-140' },
    //     { id: 2, name: '130021502W	STATOR M/CED E112M-122,HW2403' },
    //     { id: 3, name: '130041582	KEY OER EN8 10X8X60 MM' },
    //     { id: 4, name: '130121017	BEARING BALL 6210-2Z C3' }
    // ];
    // const [selectedSpare, setSelectedSpare] = useState([]);

    // const formatResult = (item) => {
    //     return (
    //         <>
    //             {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
    //             <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
    //         </>
    //     )
    // }
    // const handleOnSearch = (string, results) => {
    //     // onSearch will have as the first callback parameter
    //     // the string searched and for the second the results.
    //     // console.log(string, results)
    // }

    // const handleOnHover = (result) => {
    //     // the item hovered
    //     // console.log(result)
    // }

    // const handleOnSelect = (item) => {
    //     // the item selected
    //     // console.log(item)
    //     setSelectedSpare(item);

    // }

    // const handleOnFocus = () => {
    //     // console.log('Focused')
    // }


    const [verifyFristStepFir, setVerifyFristStepFir] = useState(false)
    const [verifyFristSecondFir, setVerifyFristSecondFir] = useState(false)


    const [showDetails, setShowDetails] = useState(false);
    const [showDetailsLogistic, setShowDetailsLogistic] = useState(false)

    // Toggle the state when checkbox is clicked
    const handleCheckboxChange = (event) => {
        setShowDetails(event.target.checked);
    };
    const handleCheckboxChangeLogistic = (event) => {
        setShowDetailsLogistic(event.target.checked);
        setShowDetails(false)
    };

    const [selectedOptionradio, setSelectedOptionradio] = useState('');

    const [tableClaim, setTableClaim] = useState(false)

    // Handle radio button change
    const handleRadioChangeradio = (event) => {
        // console.log(event.target.value);
        setSelectedOptionradio(event.target.value);
        settab4Deviation((pre) => {
            return {
                ...pre,
                wayToDistance: event.target.value
            }


        })
    };

    const [selectedOptionn, setSelectedOptionn] = useState('');

    const handleRadioChangee = (event) => {
        // console.log(event.target.value);
        setSelectedOptionn(event.target.value);
        settabClaim((pre) => {
            return {
                ...pre,
                wayToDistance: event.target.value
            }


        })

        // console.log(tab4Claim);
    };

    const [showLogistic, setShowLogistic] = useState(false)
    const handleLogstic = () => {
        setShowLogistic(true)
    }
    const handleLogsticClose = () => {
        setShowLogistic(false)
        settab4Deviation({
            ServiceTicketId: serTicId,
            TypeClaim: "Deviation",
            activityTypeId: '',
            SerialNo: '',
            ClaimNo: '',
            ParaDetail: '',
            ClaimAmount: 0,
            AttachmentType: '',
            AttachmentName: '',
            AttachmentFile: "",
            CurrentDistance: 0,
            SysDistance: 0,
            Remarks: '',
            modeOftravel: "",
            wayToDistance: ''
        })
    }
    const [showMorning, setShowMorning] = useState(false)
    const handleSaveMorning = () => {
        setShowMorning(true)
    }
    const handleMorningClose = () => {
        setShowMorning(false)
        settab4Deviation({
            ServiceTicketId: serTicId,
            TypeClaim: "Deviation",
            activityTypeId: '',
            SerialNo: '',
            ClaimNo: '',
            ParaDetail: '',
            ClaimAmount: 0,
            AttachmentType: '',
            AttachmentName: '',
            AttachmentFile: "",
            CurrentDistance: 0,
            SysDistance: 0,
            Remarks: '',
            modeOftravel: "",
            wayToDistance: ''


        })
    }

    const [showDistance, setShowDistance] = useState(false)
    const handleDistance = () => {
        setShowDistance(true)
    }


    const [showInCaseSpare, setShowInCaseSpare] = useState(false)

    const handleShowCaseSpare = () => {
        setShowInCaseSpare(true)

    }
    const handleCoseCaseSpare = () => {
        setShowInCaseSpare(false)
        settab4Deviation({
            ServiceTicketId: serTicId,
            TypeClaim: "Deviation",
            activityTypeId: '',
            SerialNo: '',
            ClaimNo: '',
            ParaDetail: '',
            ClaimAmount: 0,
            AttachmentType: '',
            AttachmentName: '',
            AttachmentFile: "",
            CurrentDistance: 0,
            SysDistance: 0,
            Remarks: '',
            modeOftravel: "",
            wayToDistance: ''


        })

    }


    const [showInCaseSundry, setShowInCaseSundry] = useState(false)

    const handleShowCaseSundry = () => {
        setShowInCaseSundry(true)

    }
    const handelCloseSundry = () => {
        setShowInCaseSundry(false)
        settab4Deviation({
            ServiceTicketId: serTicId,
            TypeClaim: "Deviation",
            activityTypeId: '',
            SerialNo: '',
            ClaimNo: '',
            ParaDetail: '',
            ClaimAmount: 0,
            AttachmentType: '',
            AttachmentName: '',
            AttachmentFile: "",
            CurrentDistance: 0,
            SysDistance: 0,
            Remarks: '',
            modeOftravel: "",
            wayToDistance: ''


        })


    }

    const [showInCaseSpecial, setShowInCaseSpecial] = useState(false)

    const handleShowInCaseSpecial = () => {
        setShowInCaseSpecial(true)

    }
    const handelCloseSpecial = () => {
        setShowInCaseSpecial(false)
        settab4Deviation({
            ServiceTicketId: serTicId,
            TypeClaim: "Deviation",
            activityTypeId: '',
            SerialNo: '',
            ClaimNo: '',
            ParaDetail: '',
            ClaimAmount: 0,
            AttachmentType: '',
            AttachmentName: '',
            AttachmentFile: "",
            CurrentDistance: 0,
            SysDistance: 0,
            Remarks: '',
            modeOftravel: "",
            wayToDistance: ''


        })


    }

    const handleDistanceClose = () => {
        setShowDistance(false)
        settab4Deviation({
            ServiceTicketId: serTicId,
            TypeClaim: "Deviation",
            activityTypeId: '',
            SerialNo: '',
            ClaimNo: '',
            ParaDetail: '',
            ClaimAmount: 0,
            AttachmentType: '',
            AttachmentName: '',
            AttachmentFile: "",
            CurrentDistance: 0,
            SysDistance: 0,
            Remarks: '',
            modeOftravel: "",
            wayToDistance: ''


        })
    }



    const [logsticValue, setLogticValue] = useState('')

    const DeviationClaim = [
        {
            type: 'Early Morning(7:30Am)',
            value: 'Early Morning(7:30Am)',
            parameter: 'None',
            possibleValue: 'Yes',
            rate: '23',
            claimRate: '450',
            TicketNum: 'CGPISL123',
            ComplainType: 'Field'

            // parameter: 'Includes Minor Repairs, Inspection & Testing. ',
            // possibleValue: 'Up to 160 Frame.',
            // rate: '650',
            // claimRate: 'NO',
            // TicketNum: 'CGPISL123',
        },
        {
            type: 'Logstic',
            value: 'Logstic',

            parameter: 'None',
            possibleValue: 'Yes',
            rate: '23',
            claimRate: '450',
            TicketNum: 'CGPISL123',
            ComplainType: 'Field'




        },

        {
            type: 'distance',
            value: 'distance',
            parameter: 'None',
            possibleValue: 'Yes',
            rate: '23',
            claimRate: '450',
            TicketNum: 'CGPISL123',
            ComplainType: 'Field'


        }



    ]

    const [selectedType, setSelectedType] = useState('');
    const [formData, setFormData] = useState([]);

    const handleTypeChange = (e) => {
        const selectedIndex = e.target.selectedIndex
        // console.log(selectedIndex)
        const type = e.target.value
        // console.log(type)
        setSelectedType(type)
        let a = e.target.options[selectedIndex].getAttribute("code");
        // console.log(a);


        settab4Deviation((pre) => {
            return {
                ...pre,
                ParaDetail: a,
                ClaimDeviationTypeId: type,


            }


        })
        // console.log(tab4Deviation);
        // console.log(tab4Claim)


        if (a == "Logistic Charges") {
            settab4Deviation((pre) => {
                return {
                    ...pre,
                    activityTypeId: '164',


                }


            })


        }


        if (a == "Early Morning (7:30 AM)") {
            settab4Deviation((pre) => {
                return {
                    ...pre,
                    ClaimAmount: '100',
                    SysDistance: '1',
                    Remarks: 'Breakfast Expenses',
                    ParaValue: '100',
                    activityTypeId: '163',



                }


            })


        }

        if (a == "Changes in distance") {
            settab4Deviation((pre) => {
                return {
                    ...pre,
                    modeOftravel: tab4Claim?.modeOftravel,
                    wayToDistance: tab4Claim?.wayToDistance,
                    ParaValue: tab4Claim?.ClaimAmount


                }


            })


        }


        if (a == "Sundry Charges") {
            settab4Deviation((pre) => {
                return {
                    ...pre,
                    Remarks: 'Sundry Charges',




                }


            })


        }


        if (a == "Special Rewinding Charges") {
            settab4Deviation((pre) => {
                return {
                    ...pre,
                    Remarks: 'Special Rewinding Charges',




                }


            })


        }



        if (a == "Incase spares weighing more than 25kg’s are to be carried.") {
            settab4Deviation((pre) => {
                return {
                    ...pre,
                    Remarks: 'Incase spares weighing more than 25kg’s are to be carried.'
                }
            })
        }




        // console.log(tab4Deviation?.ParaDetail, 'type--------------')
        // // console.log(DeviationClaim, 'ddddddd')
        // const ClaimRequest = DeviationClaim.filter((val) => val.type === type)
        // setFormData(ClaimRequest)
        // // console.log(formData)
        // // console.log(ClaimRequest, 'rrr------------')

        if (a == 'Early Morning (7:30 AM)') {
            handleSaveMorning()
            // const ClaimRequest = DeviationClaim.filter((val) => val.type === type)
            // setFormData(ClaimRequest)

        }

        if (a == 'Logistic Charges') {
            handleLogstic()

            // const ClaimRequest = DeviationClaim.filter((val) => val.type === type)
            // setFormData(ClaimRequest)

        }
        if (a == 'Changes in distance') {
            handleDistance()
            // const ClaimRequest = DeviationClaim.filter((val) => val.type === type)
            // setFormData(ClaimRequest)
            claimInformation()

        }
        if (a == 'Incase spares weighing more than 25kg’s are to be carried.') {
            handleShowCaseSpare()
            claimInformation()

        }
        if (a == 'Sundry Charges') {
            handleShowCaseSundry()
            claimInformation()


        }
        if (a == 'Special Rewinding Charges') {
            handleShowInCaseSpecial()
            claimInformation()

        }


    }

    const handleAddRow = () => {

        // setCombined((prev) => [
        //     ...prev, ...formData

        // ]);
        setFormData([]);
        setSelectedType('')
    };

    // const handleSaveLogstic = () => {
    //     // Update the rate in formData
    //     const updatedFormData = DeviationClaim.filter(item =>
    //         item.type === 'Logistic Charges'
    //             ? { ...item, rate: logsticValue } // Update the rate for 'Logistic Charges'
    //             : item
    //     );
    //     // console.log(updatedFormData, 'update')

    //     // Add updated formData to combined
    //     setFormData((prev) => [
    //         ...prev,
    //         ...updatedFormData
    //     ]);

    //     // console.log(formData, 'newcom')

    //     // Clear formData
    //     setFormData([]);
    // };

    const [distance, setDistance] = useState('');
    const [selectedOptionradiodistance, setSelectedOptionradiodistance] = useState('');

    // const handleDistanceChange = (e) => {
    //     settab4Deviation(() => [
    //         ...pre,
    //         Distance = e.target.value
    //     ]);
    // };

    // const isDistanceAbove30 = Number(distance) > 60;


    //------------------------- warranty date updated------------------


    const calculateWarrantydate = (invoiceDate) => {
        if (!invoiceDate) return '';

        const invoiceDateObj = new Date(invoiceDate);
        // Adding 12 months
        invoiceDateObj.setMonth(invoiceDateObj.getMonth() + 12);
        // Formatting the date to YYYY-MM-DD
        return invoiceDateObj.toISOString().split('T')[0];
    };

    // const invoiceDate = new Date(invoiceDateStr);
    // const warrantyDate = new Date(invoiceDate);
    // warrantyDate.setMonth(invoiceDate.getMonth() + 12);
    // const warrantyDateStr = warrantyDate.toISOString().split('T')[0];
    // tab3.warrantyDate = warrantyDateStr;


    // ---------------debouncing code
    const timeoutRef = useRef(null);


    const [FirOnChangeData, setFirOnChangeData] = useState([])

    const [IsLoadingSrNumber, setIsLoadingSrNumber] = useState(false)


    const [loadingData, setloadingData] = useState(false)
    const [notVerify, setNotVerify] = useState(false)

    const debouncedSerailNumber = (selectedSerial) => {
        settab3((pre) => ({
            ...pre,
            InvoiceDate: "",
            warrantyDate: ""
        }));

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsLoadingSrNumber(true)
        timeoutRef.current = setTimeout(() => {
            setloadingData(true)

            fetch(
                `${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfoFIR?SerialNo=${selectedSerial}&ProductCode=${tab3?.ProductCode || "0"}&InvoiceDate=${tab3?.InvoiceDate || ""}&DivisionCode=${ticketInfo[0]?.divisionCode}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    // console.log(result, 'r-------------------');
                    if (result[0]?.msgCode === "SAP101") {
                        Swal.fire({
                            icon: "error",
                            title: result[0]?.msg
                        });
                        setloadingData(false)
                        setNotVerify(true)
                        // settab3({
                        //     ProductCode: "",
                        //     DivisionCode: "",
                        //     DivisionName: '',
                        //     productLineName: '',
                        //     ProductLineCode: "",
                        //     ProductGroupCode: "",
                        //     ProductDescription: "",
                        //     BatchNo: "",
                        //     Frame: "",
                        //     Kva: "",
                        //     Hp: "",

                        //     InvoiceDate: "",
                        //     warrantyDate: ""
                        // })
                        // setFirOnChangeData([])
                        // setverifiedWarrantyStatus('')
                        // setInvoiceBatchDate('')
                        // setticketInfo([])


                    }
                    else if (result[0]?.msgCode === "YM001") {
                        Swal.fire({
                            icon: "error",
                            title: result[0]?.msg
                        })
                        setloadingData(false)
                        setNotVerify(true)


                        // settab3({
                        //     ProductCode: "",
                        //     DivisionCode: "",
                        //     DivisionName: '',
                        //     productLineName: '',
                        //     ProductLineCode: "",
                        //     ProductGroupCode: "",
                        //     ProductDescription: "",
                        //     BatchNo: "",
                        //     Frame: "",
                        //     Kva: "",
                        //     Hp: "",
                        //     InvoiceDate: "",
                        //     warrantyDate: ""

                        // })
                        // setFirOnChangeData([])
                        // setverifiedWarrantyStatus('')
                        // setInvoiceBatchDate('')




                    }
                    else {
                        setNotVerify(false)

                        setverifiedWarrantyStatus(result[0]?.warrantyDateStatus)

                        setverifiedWarrantyFromInvoice(result[0]?.invoiceDateStatus)

                        let a = result[0]?.batchStartDate;
                        // console.log(a, '11111111111111');
                        a = moment(a).format("YYYY-MM-DD");
                        let d1 = new Date(a);
                        let d2 = new Date(tab1.invoiceDate);
                        // console.log(a, 'a---------');
                        setMinInvoiceDate(a);
                        if (d1 > d2) {
                            settab3((pre) => ({
                                ...pre,
                                InvoiceDate: ""
                            }));
                        }



                        setFirOnChangeData(result[0])


                        settab3((pre) => ({
                            ...pre,
                            SerialNo: result[0]?.serialNo,
                            ProductCode: result[0]?.productCode || '',
                            DivisionCode: result[0]?.divisionCode || '',
                            DivisionName: result[0]?.divisionName || '',
                            ProductLineCode: result[0]?.productLineCode || '',
                            ProductLineName: result[0]?.productLineName || '',
                            ProductGroupCode: result[0]?.productGroupName || '',
                            ProductDescription: result[0]?.productDescription || '',
                            BatchNo: result[0]?.batchCode || '',
                            Frame: result[0]?.frame || '',
                            Kva: result[0]?.kva || '',
                            Hp: result[0]?.hp || '',
                            ManufacturingDate: result[0]?.manufacturingDate,
                            DateOfDispatch: result[0]?.dateOfDispatch,
                            FrameSizeId: result[0]?.frameSizeId
                            // warrantyDate: result[0]?.batchEndDate?.split(" ")[0] || '',
                            // InvoiceFile: result[0]?.invoceFilePath,
                        }));



                        setDefectListTable([])
                        settab3((pre) => {
                            return {
                                ...pre,
                                DefectList: []
                            }
                        })

                        setloadingData(false)

                    }
                });
        }, 1500);
    };

    // useEffect(() => {
    //     if (dateLock) {
    //         settab1((prev) => {
    //             const updatedTab1 = {
    //                 ...prev,
    //                 contactDate: dateLock
    //             };
    //             return updatedTab1;
    //         });
    //     }
    // }, [dateLock]);
    const minDate = tab1?.contactDate;
    // console.log(minDate, 'date------------')
    const formattedMinDate = useMemo(() => {
        if (!minDate) return '';
        const dateObj = new Date(minDate);
        if (isNaN(dateObj.getTime())) {
            console.error('Invalid date:', minDate);
            return '';
        }
        const localDateString = dateObj.toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD format

        return localDateString;
    }, [minDate]);

    // console.log(formattedMinDate);
    // console.log(moment(addActivity?.date).format('DD-MM-YYYY'))





    //----------------- closure status list binding




    const [clousureStatus, setClousureStatus] = useState([])


    const getClosureStatus = () => {
        fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=35&Code=${tab3?.DivisionCode ? tab3?.DivisionCode : 0}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                setClousureStatus(result)
            })
    }



    useEffect(() => {


        getClosureStatus()


    }, [tab3?.DivisionCode])

    const [optionsypeWorkdone, setOptionsypeWorkDone] = useState([])


    // console.log(optionsypeWorkdone)

    // const [dateActivityLock, setDateActivityLock] = useState('')




    const [uploadDocuments, setuploadDocuments] = useState({
        AscServiceTicketFIRId: 0,
        ServiceTicketId: serTicId,
        DocumentWithType: "",
        IsMandatory: 0,
        DocumentId: 0

    })



    const [allDocuments, setallDocuments] = useState([])


    const fetchAllDocuments = () => {
        fetch(`${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/GetAllFIRDocumentListAsync?serviceTicketId=${serTicId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                setallDocuments(result)

            })
    }


    useEffect(() => {
        fetchAllDocuments()
    }, [])



    const handleDownload = (blob, fileNameWithExt) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;


        link.setAttribute('download', `${fileNameWithExt}`); // Specify the desired file name and extension
        // link.setAttribute('download',fileName); // omitting extension
        document.body.appendChild(link);
        link.click();
        // Clean up resources
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };



    let isWorkshop = addActivityItenTable?.some(i => i?.subStatusName == "Product received at ASC")

    // console.log(addActivityItenTable);


    // console.log(isWorkshop);

    const [updatedClaims, setUpdatedClaims] = useState([]);


    // useEffect(() => {
    //     if (claimInfo && Array.isArray(claimInfo)) {
    //       const updatedClaimsWithAmounts = claimInfo.map(claim => {
    //         const distance = parseFloat(claim.distance) || 0;
    //         const paraValue = parseFloat(claim.paraValue) || 0;
    //         const claimAmount = (paraValue * distance).toFixed(2);

    //         return {
    //           ...claim,
    //           claimAmount,
    //         };
    //       });

    //       setUpdatedClaims(updatedClaimsWithAmounts);

    //       // console.log(updatedClaimsWithAmounts);
    //       settab4(updatedClaimsWithAmounts)
    //     }
    //   }, [claimInfo]);




    const [showDocDel, setShowDocDel] = useState(false)

    const handleShowDocDel = () => {
        setShowDocDel(true)
    }
    const handleCloseDocDel = () => {
        setShowDocDel(false)


    }






    const [showActDel, setShowActDel] = useState(false)

    const handleShowActDel = () => {
        setShowActDel(true)
    }
    const handleCloseActDel = () => {
        setShowActDel(false)


    }


    useEffect(() => {
        if (claimInfo && Array.isArray(claimInfo)) {
            const updatedClaimsWithAmounts = claimInfo.map(claim => {
                const distance = parseFloat(claim.distance) || 0;
                const paraValue = parseFloat(claim.paraValue) || 0;

                let claimAmount;
                if (claim.isConveyance == "1") {
                    claimAmount = (paraValue * distance).toFixed(2);
                } else {
                    claimAmount = claim.claimAmount; // Keep existing claimAmount for non-conveyance items
                }

                return {
                    ...claim,
                    claimAmount,
                };
            });

            setUpdatedClaims(updatedClaimsWithAmounts);


            settab4(updatedClaimsWithAmounts)
        }
    }, [claimInfo]);


    // const handleParaValueChange = (index, value) => {
    //     const newClaimInfo = [...claimInfo];

    //     if (!newClaimInfo[index]) return;

    //     const distance = parseFloat(newClaimInfo[index]?.distance) || 0;
    //     const newParaValue = value; 

    //     newClaimInfo[index].paraValue = newParaValue;

    //     const parsedParaValue = parseFloat(newParaValue) || 0; // convert to number for calculation
    //     newClaimInfo[index].claimAmount = (parsedParaValue * distance).toFixed(2);

    //     setClaimInfo(newClaimInfo);



    //     settab4(newClaimInfo)



    //   };


    const handleParaValueChange = (index, value) => {
        const newClaimInfo = [...claimInfo];

        if (!newClaimInfo[index]) return;

        const distance = parseFloat(newClaimInfo[index]?.distance) || 0;
        const newParaValue = value;

        newClaimInfo[index].paraValue = newParaValue;


        if (newClaimInfo[index].isConveyance == "1") {
            const parsedParaValue = parseFloat(newParaValue) || 0;
            newClaimInfo[index].claimAmount = (parsedParaValue * distance).toFixed(2);

            setClaimInfo(newClaimInfo);



            settab4(newClaimInfo)

        }
        else {
            const parsedParaValue = parseFloat(newParaValue) || 0;

            newClaimInfo[index].claimAmount = parsedParaValue;

            setClaimInfo(newClaimInfo);



            settab4(newClaimInfo)

        }




    };



    //   const totalCalculatedValue = claimInfo.reduce((total, claim) => {
    //     const paraValue = parseFloat(claim.paraValue) || 0;
    //     const distance = parseFloat(claim.distance) || 0;
    //     return total + (paraValue * distance);
    //   }, 0);


    const totalCalculatedValue = claimInfo.reduce((total, claim) => {
        if (claim.isConveyance == "1") {
            const paraValue = parseFloat(claim.paraValue) || 0;
            const distance = parseFloat(claim.distance) || 0;
            return total + (paraValue * distance);
        }
        else {
            const claimAmount = parseFloat(claim.claimAmount) || 0;
            return total + claimAmount;
        }
    }, 0);





    useEffect(() => {
        allStatus(ticketInfo[0]?.divisionCode)
    }, [addActivity?.activeStatusId, addActivity?.typeOfActivity])





    useEffect(() => {
        // console.log(addActivityItenTable);
        let exists = addActivityItenTable?.some(i => i?.statusName == "Product required at ASC" && i?.subStatusName == "Waiting for Product")
        // console.log(exists);
        if (exists) {
            setaddActivity((pre) => {
                return {
                    ...pre,
                    activeStatusId: "9"
                }
            })
            fetch(`${process.env.REACT_APP_API_URL}Common/GetAllActivitySubStatus?ServiceTicketId=${serTicId}&ActivityStatusId=${9}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    // console.log(result);
                    setactivitySubStatus(result)
                })

        }
        else {
            // console.log("--");

        }



    }, [addActivityItenTable])








    let isshowexists = claimInfo?.some(i => i?.isShow == "1")

    console.log(isshowexists);

    let isDistance60 = claimInfo?.some(i => i?.distance > 60)


    // console.log()
    let isDistance120 = claimInfo?.some(i => i?.distance > 120)
    // useEffect(() => {
    //     // console.log(isshowexists);
    //     // console.log(isDistance60);
    // }, [isshowexists, isDistance60, isDistance120]);



    // // console.log(isDistance120);


    // // console.log(isshowexists);



    // const [serailNoEmpty, setserailNoEmpty] = useState(false)

    //     useEffect(()=>{
    //         console.log("spare list logging");

    //         console.log(spareList);
    // if(ticketInfo[0]?.divisionCode == "M4" && spareList?.some(i=>i?.desc?.includes("BEARING")) && spareList?.some(i => i?.quantity != i?.serialNumbers?.filter(sn => sn !== "").length)){
    //     // alert("Serial Nos. required")
    //     setserailNoEmpty(true)

    // }
    // else if((ticketInfo[0]?.divisionCode == "CP" && ticketInfo[0]?.productLineCode == "C1" && spareList?.some(i=>i?.desc?.includes("BEARING")) && spareList?.some(i => i?.quantity != i?.serialNumbers?.filter(sn => sn !== "").length))){
    //     // alert("Serial Nos. required")
    //     setserailNoEmpty(true)

    // }
    // else if((ticketInfo[0]?.divisionCode == "CP" && ticketInfo[0]?.productLineCode == "FD" && spareList?.some(i=>i?.desc?.includes("CAPACITOR")) && spareList?.some(i => i?.quantity != i?.serialNumbers?.filter(sn => sn !== "").length))){
    //     // alert("Serial Nos. required")
    //     setserailNoEmpty(true)
    // }
    // else if((ticketInfo[0]?.divisionCode == "M3" && ticketInfo[0]?.productLineCode == "DC") && ((spareList?.some(i=>i?.desc?.includes("AVR MODEL")) || spareList?.some(i=>i?.desc?.includes("AVR  MODEL")) ||spareList?.some(i=>i?.desc?.includes("AVR MODLE")) ) && (spareList?.some(i => i?.quantity != i?.serialNumbers?.filter(sn => sn !== "").length)))){
    //     //   alert("Serial Nos. required")
    //     setserailNoEmpty(true)
    // }
    // else{
    //     setserailNoEmpty(false)

    // }


    //         console.log("spare effect");


    //     },[spareList])





    return (
        <>

            {loadingData ? <Spinner /> : <>
                <Row>
                    <Col>
                        <Card
                            className="border-0 pt-0 px-2"
                            //   style={{ boxShadow: "0px 0px 5px 4px rgba(0,91,171,1)" }}
                            style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
                        >
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <p className='m-0 mdl-title' style={{
                                        fontSize: '14px',
                                        fontWeight: '600'
                                    }}><CgFileDocument fontSize={14} color='#000' className='mr-2' />
                                        {pageLabel}</p>

                                    {/* <span style={{
                                    fontSize: '18px',
                                    fontWeight: '600'
                                }} className="text-start  m-0">
                                    Open Request
                                </span> */}
                                </div>
                                <div className='d-flex gap-1'>
                                    {/* <Button variant='' className='add-Btn' onClick={handleShowProductInfo}>
                                </Button> */}
                                    <Tooltip arrow placement="left" title="back">
                                        <IconButton
                                            className=" m-0 p-0 "
                                            onClick={() => {
                                                navigate(-1)
                                            }}
                                        >
                                            <IoIosArrowRoundBack
                                                style={{ cursor: "pointer" }}
                                                fontSize={30}
                                                color="#005bab"

                                            />

                                        </IconButton>
                                    </Tooltip>
                                    {/* <ReactToPrint
        trigger={() => }
        content={() => componentRef.current}
      /> */}


                                    <Tooltip arrow placement="left" title="view product info">
                                        <IconButton
                                            className=" m-0 p-0 "
                                            onClick={handleShowProductInfo}
                                        >
                                            <BsInfoCircleFill fontSize={20} color='#005bab' />

                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip arrow placement="left" title="mail">
                                        <IconButton
                                            className=" m-0 p-0 "
                                        >
                                            <IoMail fontSize={20} color='#005bab' />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip arrow placement="left" title="refresh">
                                        <IconButton
                                            className=" m-0 p-0 "
                                        >
                                            <IoSyncOutline fontSize={20} color='#005bab' />
                                        </IconButton>
                                    </Tooltip>
                                </div>


                            </div>
                            {/* <hr /> */}



                            <Row className="justify-content-start pt-0">

                                <Row className="">



                                    <Col lg={12} md={12} sm={12}>

                                        <>
                                            <div className='customAccordion'>

                                                <Accordion activeKey={activeKeyEdit} onSelect={handleSelect}>
                                                    <Accordion.Item className='breakdowan-accor' eventKey="0">
                                                        <Accordion.Header >
                                                            <div className='d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0'
                                                            >
                                                                <p className='m-0'>
                                                                    {
                                                                        (customerData || activeKeyEdit === '1' || ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4")

                                                                            ?
                                                                            <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                            : <strong className='mr-2'>1</strong>

                                                                    }

                                                                    {acknowledgementStatus == "Customer Contacted" ? "Customer Contacted" : acknowledgementStatus == "Product received at workshop" ? "Product received at workshop" : ""}</p><span>
                                                                    {/* <Button disabled={!verifiedProduct} variant='' style={{
                                                                    outline: 'none',
                                                                    border: 'none'
                                                                }}>
                                                                    <IoMdSave color='#7bc143'
                                                                        onClick={() => {
a

                                                                            setCustomerData(true);
                                                                            // setSaved(true); // Ensure saved is false when workCompleted is true
                                                                            setactiveKeyEdit('1');




                                                                        }}
                                                                        fontSize={20} />


                                                                </Button> */}
                                                                </span>
                                                            </div>
                                                        </Accordion.Header>
                                                        <Accordion.Body className='accordion-btn pt-0 pb-1'>
                                                            <Row>
                                                                <Col >


                                                                    <Row className=' mt-1 align-items-center justofy-content-center  '>
                                                                        <Col md={2} style={{
                                                                            whiteSpace: 'nowrap'
                                                                        }}>
                                                                            <Form.Group className="text-start">
                                                                                <Form.Label>{acknowledgementStatus == "Customer Contacted" ? "Contact date" : acknowledgementStatus == "Product received at workshop" ? "Product received date" : ""}<span className="req-t">*</span></Form.Label>
                                                                                <Form.Control type='date'
                                                                                    autoComplete="new-password"

                                                                                    name='contactDate'
                                                                                    value={
                                                                                        moment(tab1?.contactDate)?.format("YYYY-MM-DD")}
                                                                                    // onChange={handleChange}
                                                                                    onChange={(e) => {
                                                                                        // console.log(e, 'e--------------')
                                                                                        settab1((prev) => {
                                                                                            return {
                                                                                                ...prev,
                                                                                                contactDate: e.target.value
                                                                                            }
                                                                                        }
                                                                                        )
                                                                                    }}

                                                                                    min={(acknowledgementStatus == "Customer Contacted" || acknowledgementStatus == "Product received at workshop") ? reqDate : ''}
                                                                                    max={currentDate}
                                                                                    readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col
                                                                            md={2}
                                                                            style={{
                                                                                whiteSpace: "nowrap",
                                                                            }}
                                                                        >
                                                                            <Form.Group>
                                                                                <Form.Label className="text-start">
                                                                                    Serial No{" "}
                                                                                    {
                                                                                        ticketInfo[0]?.divisionCode == 'M7' || ticketInfo[0]?.divisionCode == 'DR' ? "" : (
                                                                                            <span className="req-t">*</span>
                                                                                        )
                                                                                    }
                                                                                </Form.Label>
                                                                                <Form.Control
                                                                                    autoComplete="new-password"

                                                                                    type="text"
                                                                                    name="serialNo"
                                                                                    value={tab1?.serialNo || ''}
                                                                                    onChange={(e) => {
                                                                                        const selectedSerail = e.target.value
                                                                                        handleChange(e)
                                                                                        fetch(
                                                                                            `${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${selectedSerail ? selectedSerail : ""}&ProductCode=${tab1?.productCode ? tab1?.productCode : "0"}&InvoiceDate=${tab1?.invoiceDate ? tab1?.invoiceDate : ""}&DivisionCode=${ticketInfo[0]?.divisionCode} `,

                                                                                            {
                                                                                                headers: {
                                                                                                    Authorization: `Bearer ${token}`,
                                                                                                },
                                                                                            }
                                                                                        )
                                                                                            .then((res) => res.json())
                                                                                            .then((result) => {
                                                                                                // console.log(result[0]?.batchStartDate)
                                                                                                let a = result[0]?.batchStartDate;


                                                                                                // console.log(a, '11111111111111')
                                                                                                a = moment(a).format("YYYY-MM-DD")
                                                                                                let d1 = new Date(a);
                                                                                                let d2 = new Date(tab1.invoiceDate);
                                                                                                // console.log(a, 'a---------')
                                                                                                setMinInvoiceDate(a);
                                                                                                if (d1 > d2) {
                                                                                                    settab1((pre) => {
                                                                                                        return {
                                                                                                            ...pre,
                                                                                                            invoiceDate: ""
                                                                                                        }
                                                                                                    }
                                                                                                    )
                                                                                                }

                                                                                            })
                                                                                        //   // console.log(result);
                                                                                        // setinfolog(result);





                                                                                        setverifiedWarrantyStatus("")
                                                                                        setverifiedWarrantyFromInvoice("")

                                                                                    }}

                                                                                    readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}

                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col md={2}>
                                                                            <Form.Label>
                                                                                Product Code{" "}
                                                                                {
                                                                                    ticketInfo[0]?.divisionCode === 'M7' || ticketInfo[0]?.divisionCode === 'DR' ? "" : (
                                                                                        <span className="req-t">*</span>
                                                                                    )
                                                                                }
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                autoComplete="new-password"

                                                                                type="text"
                                                                                name="productCode"
                                                                                value={tab1?.productCode || ''}
                                                                                onChange={handleChange}

                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}


                                                                            />
                                                                        </Col>
                                                                        <Col
                                                                            md={2}
                                                                            style={{
                                                                                whiteSpace: "nowrap",
                                                                            }}
                                                                        >
                                                                            <Form.Group>
                                                                                <Form.Label className="text-start">
                                                                                    Invoice No{" "}
                                                                                    <span className="req-t">*</span>
                                                                                </Form.Label>
                                                                                <Form.Control
                                                                                    autoComplete="new-password"

                                                                                    type="text"
                                                                                    name="invoiceNo"
                                                                                    value={tab1?.invoiceNo}
                                                                                    onChange={handleChange}

                                                                                    readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}


                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col
                                                                            md={2}
                                                                            style={{
                                                                                whiteSpace: "nowrap",
                                                                            }}
                                                                        >
                                                                            <Form.Group className="text-start">
                                                                                <Form.Label>
                                                                                    Invoice date{" "}
                                                                                    <span className="req-t">*</span>
                                                                                </Form.Label>
                                                                                <Form.Control
                                                                                    autoComplete="new-password"

                                                                                    type="date"
                                                                                    name='invoiceDate'
                                                                                    value={moment(
                                                                                        tab1?.invoiceDate
                                                                                    )?.format("YYYY-MM-DD")}
                                                                                    min={minInvoiceDate}
                                                                                    max={currentDate}
                                                                                    onChange={handleChange}
                                                                                    readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}

                                                                                // value={currentProduct?.invoiceDate || ''}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        {ticketInfo[0]?.invoceFilePath == "" ? "" : <Col md={1} className='m-0 p-0' style={{
                                                                            whiteSpace: 'nowrap'
                                                                        }}>
                                                                            <Form.Group>
                                                                                <Form.Label>Download invoice </Form.Label>
                                                                                <p className='m-0 p-0 text-center'>  <FaDownload
                                                                                    fontSize={20} color='#7bc143' style={{ cursor: "pointer" }} className='mx-4 pointer'
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();



                                                                                        const downloadUrl = `${process.env.REACT_APP_API_URL}DownloadFile/DownloadFile?FilePath=${ticketInfo[0]?.invoceFilePath}`;


                                                                                        fetch(downloadUrl, {
                                                                                            headers: {
                                                                                                "Content-Type": "application/json",
                                                                                                "Authorization": `Bearer ${token}`
                                                                                            },

                                                                                        })
                                                                                            .then((res) => {
                                                                                                // console.log("logging file response");
                                                                                                // console.log(res);
                                                                                                const lastDotIndex = res.url.lastIndexOf(".");
                                                                                                const lastUnderscoreIndex = res.url.lastIndexOf("_");
                                                                                                const fileNameWithExt = res.url.slice(lastUnderscoreIndex + 1);
                                                                                                // const extension = res.url.slice(lastDotIndex + 1);//to get ext

                                                                                                // console.log("File Name:", fileNameWithExt);
                                                                                                // // console.log("Extension:", extension);
                                                                                                //    // console.log(ext);
                                                                                                let resp = res.blob()
                                                                                                resp.then((r) => {
                                                                                                    // console.log(r);
                                                                                                    if (r instanceof Blob) {
                                                                                                        handleDownload(r, fileNameWithExt);
                                                                                                    } else {
                                                                                                        // Handle non-Blob responses
                                                                                                        console.error('Response is not a Blob');
                                                                                                    }

                                                                                                })
                                                                                            })








                                                                                        // const link = document.createElement('a');
                                                                                        // link.href = "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600";
                                                                                        // link.download = 'downloaded_image.jpeg';
                                                                                        // document.body.appendChild(link);
                                                                                        // link.click();
                                                                                        // document.body.removeChild(link);
                                                                                    }}
                                                                                />
                                                                                </p>
                                                                            </Form.Group>

                                                                        </Col>}

                                                                        {(
                                                                            // (verifiedWarrantyStatus && verifiedWarrantyFromInvoice) ||
                                                                            (ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4")) ? "" : <Col md={1} style={{
                                                                                display: 'flex',
                                                                                flexDirection: 'row-reverse'
                                                                            }} className='mt-4 '>

                                                                            <Button
                                                                                variant=""
                                                                                // disabled={verifiedProduct}
                                                                                onClick={handleVerify}
                                                                                className="add-Btn"
                                                                            >
                                                                                <MdVerifiedUser fontSize={20} />
                                                                            </Button>
                                                                        </Col>}



                                                                    </Row>




                                                                    {((verifiedWarrantyStatus && verifiedWarrantyFromInvoice) || (ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4")) ? <>
                                                                        <Row className='mt-2'>

                                                                            <Col md={2}>

                                                                                <Form.Label>
                                                                                    Warranty Status (from batch)
                                                                                </Form.Label> <br />

                                                                                <p style={{
                                                                                    display: 'inline-block'
                                                                                }} className={`ticketInfoLabelST m-0 ${verifiedWarrantyStatus == "In Warranty" ? `WStatus` : verifiedWarrantyStatus == "Out Of Warranty" ? "OOWStatus" : ""}`}>



                                                                                    {verifiedWarrantyStatus}

                                                                                </p>
                                                                            </Col>
                                                                            <Col md={2}>

                                                                                <Form.Label>
                                                                                    Warranty Status (from invoice)
                                                                                </Form.Label> <br />

                                                                                <p style={{
                                                                                    display: 'inline-block'
                                                                                }} className={`ticketInfoLabelST m-0 ${verifiedWarrantyFromInvoice == "In Warranty" ? `WStatus` : verifiedWarrantyFromInvoice == "Out Of Warranty" ? "OOWStatus" : ""}`}>



                                                                                    {verifiedWarrantyFromInvoice}

                                                                                </p>
                                                                            </Col>




                                                                        </Row>


                                                                        <Row className=''>
                                                                            <Col md={2}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Service request status <span className="req-t">*</span></Form.Label>
                                                                                    <Form.Select name='serviceRequestSubStatusId' value={tab1?.serviceRequestSubStatusId}


                                                                                        disabled={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}

                                                                                        onChange={(e) => {



                                                                                            settab1((pre) => {
                                                                                                return {
                                                                                                    ...pre,
                                                                                                    serviceRequestSubStatusId: e.target.value,
                                                                                                    productRquestDate: ""
                                                                                                }
                                                                                            })



                                                                                            if (e.target.value == "28") {
                                                                                                settab1((pre) => {
                                                                                                    return {
                                                                                                        ...pre,
                                                                                                        complainType: "Workshop",

                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                            else if (e.target.value == "30") {
                                                                                                settab1((pre) => {
                                                                                                    return {
                                                                                                        ...pre,
                                                                                                        complainType: "Field",
                                                                                                        // technicianId: asc

                                                                                                    }
                                                                                                })
                                                                                            }



                                                                                            if (e.target.value) {



                                                                                                fetch(`${process.env.REACT_APP_API_URL}STSubStatus/ServiceTicketStatus?SubStatusid=${e.target.value}`, {
                                                                                                    headers: {
                                                                                                        Authorization: `Bearer ${token}`,
                                                                                                    },
                                                                                                })
                                                                                                    .then((res) => res.json())
                                                                                                    .then((result) => {
                                                                                                        // console.log(result);
                                                                                                        setsubSubStatus(result)
                                                                                                    })

                                                                                            }




                                                                                        }}>
                                                                                        <option value=''>Select</option>
                                                                                        {StSubStatus?.map((status, i) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <option
                                                                                                        value={status?.stSubStatusId}
                                                                                                    >
                                                                                                        {status?.stSubStatusName}
                                                                                                    </option>
                                                                                                </>
                                                                                            );
                                                                                        })}

                                                                                    </Form.Select>

                                                                                </Form.Group>
                                                                            </Col>



                                                                            {(tab1?.serviceRequestSubStatusId == '8' || tab1?.serviceRequestSubStatusId == '22' || tab1?.serviceRequestSubStatusId == '24' || tab1?.serviceRequestSubStatusId == '26') && (
                                                                                <Col md={2}>
                                                                                    <Form.Group>
                                                                                        <Form.Label>Service Request sub status <span className="req-t">*</span></Form.Label>
                                                                                        <Form.Select name='serviceRequestCustStatusid' value={tab1?.serviceRequestCustStatusid}

                                                                                            disabled={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}

                                                                                            onChange={handleChange}>
                                                                                            <option value=''>Select</option>
                                                                                            {subSubStatus?.map((substatus, i) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <option
                                                                                                            value={
                                                                                                                substatus?.serviceTicketStatusId
                                                                                                            }
                                                                                                        >
                                                                                                            {substatus?.serviceTicketStatusName}
                                                                                                        </option>
                                                                                                    </>
                                                                                                );
                                                                                            })}
                                                                                        </Form.Select>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            )}
                                                                            {/* {(tab1?.ServiceRequestSubStatusId == '24') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Service Request sub status</Form.Label>
                                                                                                <Form.Select onChange={handleServiceCloseChange}>
                                                                                                    <option value=''>Select</option>
                                                                                                    {Object.keys(Closed).map(key => (
                                                                                                        <option key={key} value={key}>{Closed[key]}</option>
                                                                                                    ))}
                                                                                                </Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )} */}
                                                                            {/* {(tab1?.ServiceRequestSubStatusId == '26') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Service Request sub status</Form.Label>
                                                                                                <Form.Select onChange={handleServiceCustomerChange}>
                                                                                                    <option value=''>Select</option>
                                                                                                    {Object.keys(Customer).map(key => (
                                                                                                        <option key={key} value={key}>{Customer[key]}</option>
                                                                                                    ))}
                                                                                                </Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )} */}
                                                                            {(tab1?.serviceRequestSubStatusId == '28' || tab1?.serviceRequestSubStatusId == '30') && (
                                                                                <Col md={2}>
                                                                                    <Form.Group>
                                                                                        <Form.Label>{tab1?.serviceRequestSubStatusId == '28' ? "Product required date" : tab1?.serviceRequestSubStatusId == '30' ? "Site visit date" : ""}<span className="req-t">*</span></Form.Label>
                                                                                        <Form.Control type='date' name='productRquestDate' value={moment(
                                                                                            tab1?.productRquestDate
                                                                                        )?.format("YYYY-MM-DD")} min={tab1?.contactDate} onChange={handleChange}
                                                                                            readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}

                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            )}
                                                                            {/* {(tab1?.ServiceRequestSubStatusId == '23') && (
                                                                                        <Col md={2}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Product Recieved date</Form.Label>
                                                                                                <Form.Control name=''  onChange={handleChange}  type='date' />
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    )} */}
                                                                            {(tab1?.serviceRequestSubStatusId == '30') && (
                                                                                RoleName == "AS8" ?
                                                                                <Col md={2}>
                                                                                    <Form.Group>
                                                                                        <Form.Label>Assigned Engineer <span className="req-t">*</span></Form.Label>
                                                                                        <Form.Control type='text' readOnly value={Username} />

                                                                                    </Form.Group>
                                                                                </Col>

                                                                                :
                                                                                <Col md={2}>
                                                                                    <Form.Group>
                                                                                        <Form.Label>Assign tech <span className="req-t">*</span></Form.Label>
                                                                                        <Form.Select name='technicianId' value={tab1?.technicianId} onChange={handleChange}

                                                                                            disabled={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}

                                                                                        >
                                                                                            <option value=''>Select</option>
                                                                                            {ASCWiseTecnicians?.map(
                                                                                                (technician, i) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <option
                                                                                                                value={
                                                                                                                    technician?.technicianId
                                                                                                                }
                                                                                                            >
                                                                                                                {
                                                                                                                    technician?.technicianName
                                                                                                                }
                                                                                                            </option>
                                                                                                        </>
                                                                                                    );
                                                                                                }
                                                                                            )}
                                                                                        </Form.Select>
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            )}

                                                                            {(tab1?.serviceRequestSubStatusId == '28') && (
                                                                                <Col md={2}>
                                                                                    <Form.Group>
                                                                                        <Form.Label>Complain type</Form.Label>
                                                                                        <Form.Control name='complainType' onChange={handleChange} type='text' readOnly value='Workshop' />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            )}
                                                                            {(tab1?.serviceRequestSubStatusId == '30') && (
                                                                                <Col md={2}>
                                                                                    <Form.Group>
                                                                                        <Form.Label>Complaint type</Form.Label>
                                                                                        <Form.Control name='complainType' onChange={handleChange} type='text' readOnly value='Field' />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            )}


                                                                            {(tab1?.serviceRequestSubStatusId == '8' || tab1?.serviceRequestSubStatusId == '22' || tab1?.serviceRequestSubStatusId == '23' || tab1?.serviceRequestSubStatusId == '24' || tab1?.serviceRequestSubStatusId == '26' || tab1?.serviceRequestSubStatusId == '30' || tab1?.serviceRequestSubStatusId == '28') && (
                                                                                <Col md={4}>
                                                                                    <Form.Group>
                                                                                        <Form.Label>Remarks <span className="req-t">*</span></Form.Label>
                                                                                        <Form.Control as='textarea' autoComplete="new-password"
                                                                                            rows='2' name='remarks' value={tab1?.remarks} onChange={handleChange}
                                                                                            readOnly={ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}

                                                                                        />
                                                                                    </Form.Group>
                                                                                </Col>
                                                                            )}


                                                                        </Row>
                                                                        {(ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" :
                                                                            <Row className='justify-content-center align-items-center mt-2'>
                                                                                <Col md={1} >
                                                                                    <Button
                                                                                        variant=""
                                                                                        // disabled={verifiedProduct}
                                                                                        onClick={() => {

                                                                                            // console.log(tab1, 'tab1-----------');

                                                                                            if (tab1?.serviceRequestSubStatusId == "0") {
                                                                                                Swal.fire({
                                                                                                    icon: 'error',
                                                                                                    title: "Please select service request status!"
                                                                                                })
                                                                                            }
                                                                                            else if (tab1?.serviceRequestSubStatusId == '8' || tab1?.serviceRequestSubStatusId == '22' || tab1?.serviceRequestSubStatusId == '24' || tab1?.serviceRequestSubStatusId == '26' && tab1?.serviceRequestCustStatusid == '0') {
                                                                                                Swal.fire({
                                                                                                    icon: 'error',
                                                                                                    title: "Please select sub service request status!"
                                                                                                })
                                                                                            }

                                                                                            else if ((tab1?.serviceRequestSubStatusId == '28') && tab1?.productRquestDate == '') {
                                                                                                Swal.fire({
                                                                                                    icon: 'error',
                                                                                                    title: "Product required date is required"
                                                                                                })

                                                                                            }
                                                                                            else if ((tab1?.serviceRequestSubStatusId == '30') && tab1?.productRquestDate == '') {
                                                                                                Swal.fire({
                                                                                                    icon: 'error',
                                                                                                    title: "Site visit date is required"
                                                                                                })

                                                                                            }
                                                                                            else if (RoleName!= "AS8" && tab1?.serviceRequestSubStatusId == '30' && tab1?.technicianId == '0') {
                                                                                                Swal.fire({
                                                                                                    icon: 'error',
                                                                                                    title: "Technician is required"
                                                                                                })
                                                                                            }

                                                                                            else if (tab1?.serviceRequestSubStatusId != '0' && tab1?.remarks == '') {
                                                                                                Swal.fire({
                                                                                                    icon: 'error',
                                                                                                    title: "Remarks is required"
                                                                                                })


                                                                                            }
                                                                                            else {
                                                                                                fetch(`${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpsertAscServiceTicketCustomer`, {
                                                                                                    method: "POST",
                                                                                                    headers: {
                                                                                                        "Content-Type": "application/json",
                                                                                                        "Authorization": `Bearer ${token}`
                                                                                                    },
                                                                                                    body: JSON.stringify(tab1)
                                                                                                })
                                                                                                    .then(res => res.text())  // Extract text from the response
                                                                                                    .then(responseText => {
                                                                                                        // console.log(responseText);

                                                                                                        // Define a regex pattern for validation
                                                                                                        const regextest = /^[a-zA-Z0-9]+$/;
                                                                                                        if (responseText === 'ASM001') {
                                                                                                            handleShowRequestInfo();
                                                                                                            // Update the active key for editing
                                                                                                            // Call a specific function if the response is 'ASM001'
                                                                                                        } else if (responseText === 'ASM002') {
                                                                                                            Swal.fire({
                                                                                                                icon: 'success',
                                                                                                                title: 'Submitted successfully!'
                                                                                                            });
                                                                                                            const nextKey = (parseInt(activeKeyEdit) + 1).toString();
                                                                                                            if (nextKey <= '3') { // Ensure it doesn't go beyond the last item
                                                                                                                setactiveKeyEdit(nextKey);
                                                                                                            }  // Update the active key for editing

                                                                                                            setCustomerData(true);

                                                                                                            fetchdataById()
                                                                                                            getSubmittedData()

                                                                                                        } else {
                                                                                                            Swal.fire({
                                                                                                                icon: 'error',
                                                                                                                title: 'Something went wrong!'
                                                                                                            });
                                                                                                        }
                                                                                                    })
                                                                                                    .catch(error => {
                                                                                                        console.error('Error:', error);  // Log any errors that occur
                                                                                                        Swal.fire({
                                                                                                            icon: 'error',
                                                                                                            title: 'Something went wrong!',
                                                                                                            text: 'An unexpected error occurred.'
                                                                                                        });
                                                                                                    });
                                                                                            }


                                                                                        }}
                                                                                        className="add-Btn"
                                                                                    >
                                                                                        Submit
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>}
                                                                    </>




                                                                        : ""}







                                                                </Col>

                                                            </Row>




                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey="1">
                                                        <Accordion.Header>
                                                            <div className='d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0'
                                                            >
                                                                <p className='m-0'>
                                                                    {
                                                                        (activity || ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4")
                                                                            ?
                                                                            <FaCircleCheck color='#58a718' fontSize={20} className='mr-2' />
                                                                            : <strong className='mr-2'>2</strong>
                                                                    }
                                                                    Activity


                                                                </p>
                                                                <span>
                                                                    {/* <Button disabled={!submitEnabled} variant=''
                                                                    style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }}>

                                                                    <IoMdSave onClick={() => {
                                                                        {


                                                                            setActivity(true)
                                                                            setactiveKeyEdit('5')

                                                                        }

                                                                    }} color='#7bc143' fontSize={20} />
                                                                </Button> */}
                                                                    {/* <span>
                                                                    <Button style={{
                                                                        outline: 'none',
                                                                        border: 'none'
                                                                    }} variant=''> <IoArrowUpOutline fontSize={15} color='#fff' onClick={() => {
                                                                        setactiveKeyEdit('0')

                                                                    }} /></Button>

                                                                </span> */}
                                                                </span>

                                                            </div>
                                                        </Accordion.Header>
                                                        <Accordion.Body className='pt-0 pb-1'>

                                                            <Form id="activityForm">



                                                                {ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" ? "" : <Row>
                                                                    {(tab1?.serviceRequestSubStatusId == "23" || tab1?.serviceRequestSubStatusId == '28' || submittedDataTab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "23" || isWorkshop) ?
                                                                        (
                                                                            <Col md={1}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Complaint type</Form.Label>
                                                                                    <Form.Control type='text' readOnly value='Workshop' />
                                                                                </Form.Group>
                                                                            </Col>
                                                                        ) : ""}
                                                                    {((tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") && (!isWorkshop || isWorkshop == "")) ?
                                                                        (
                                                                            <Col md={1}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Complaint type</Form.Label>
                                                                                    <Form.Control type='text' readOnly value='Field' />
                                                                                </Form.Group>
                                                                            </Col>
                                                                        ) : ""}
                                                                    <Col md={2} style={{
                                                                        whiteSpace: 'nowrap'
                                                                    }}>
                                                                        <Form.Group className="text-start">
                                                                            <Form.Label>Date<span className="req-t">*</span></Form.Label>
                                                                            <Form.Control type='date'
                                                                                name='date'
                                                                                disabled={submitEnabled}
                                                                                min={formattedMinDate}
                                                                                max={currentDate}
                                                                                value={(addActivity?.date)}
                                                                                onChange={(e) => {

                                                                                    setaddActivity(prev => ({ ...prev, date: e.target.value }))
                                                                                    setaddActivityTable(prev => ({ ...prev, date: e.target.value }))


                                                                                }}
                                                                            // min={currentDate}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>




                                                                    <Col md={2} style={{
                                                                        whiteSpace: 'nowrap'
                                                                    }}>
                                                                        <Form.Group className="text-start">
                                                                            <Form.Label>Status <span className="req-t">*</span></Form.Label>
                                                                            <Form.Select value={addActivity?.activeStatusId}
                                                                                disabled={submitEnabled}


                                                                                onChange={(e) => {
                                                                                    setActivities([])
                                                                                    setactivitySubStatus([])
                                                                                    setaddActivity((pre) => {
                                                                                        return {
                                                                                            ...pre,
                                                                                            typeOfActivity: [],
                                                                                            activeSubStatusId: 0
                                                                                        }
                                                                                    })
                                                                                    let selectedIndex = e.target.selectedIndex
                                                                                    const selectedStatus = e.target.value;
                                                                                    setaddActivity(prev => ({ ...prev, activeStatusId: e.target.value }));
                                                                                    setaddActivityTable(prev => ({ ...prev, activeStatusId: e.target.options[selectedIndex].getAttribute("code") }));
                                                                                    // Enable submit button if 'Work completed' is selected
                                                                                    if (selectedStatus === 'Work completed') {
                                                                                        setSubmitEnabled(true);
                                                                                    } else {
                                                                                        setSubmitEnabled(false);
                                                                                    }




                                                                                    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllActivitySubStatus?ServiceTicketId=${serTicId}&ActivityStatusId=${e.target.value}`, {
                                                                                        headers: {
                                                                                            Authorization: `Bearer ${token}`,
                                                                                        },
                                                                                    })
                                                                                        .then((res) => res.json())
                                                                                        .then((result) => {
                                                                                            // console.log(result);


                                                                                            setactivitySubStatus(result)

                                                                                        })

                                                                                }}

                                                                            >
                                                                                <option value='0'>Select</option>
                                                                                {
                                                                                    activityStatus?.map((status, i) => {
                                                                                        return (
                                                                                            <>
                                                                                                <option value={status?.parameterTypeId} code={status?.parameterType}>{status?.parameterType}</option>
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>

                                                                    {
                                                                        (activitySubStatus.length > 0) && (

                                                                            <Col md={2} style={{
                                                                                whiteSpace: 'nowrap'
                                                                            }}>
                                                                                <Form.Group className="text-start">
                                                                                    <Form.Label>Sub status <span className="req-t">*</span></Form.Label>
                                                                                    <Form.Select value={addActivity?.activeSubStatusId}
                                                                                        disabled={submitEnabled}


                                                                                        onChange={(e) => {

                                                                                            // console.log(e.target.value);

                                                                                            setActivities([])
                                                                                            setaddActivity((pre) => {
                                                                                                return {
                                                                                                    ...pre,
                                                                                                    typeOfActivity: []
                                                                                                }
                                                                                            })
                                                                                            let selectedIndex = e.target.selectedIndex
                                                                                            // const selectedStatus = e.target.value;`
                                                                                            setaddActivity(prev => ({ ...prev, activeSubStatusId: e.target.value }));
                                                                                            setaddActivityTable(prev => ({ ...prev, activeSubStatusId: e.target.options[selectedIndex].getAttribute("code") }));
                                                                                            // Enable submit button if 'Work completed' is selected
                                                                                            // if (selectedStatus === 'Work completed') {
                                                                                            //     setSubmitEnabled(true); 
                                                                                            // } else {
                                                                                            //     setSubmitEnabled(false);
                                                                                            // }
                                                                                        }}

                                                                                    >
                                                                                        <option value='0'>Select</option>
                                                                                        {
                                                                                            activitySubStatus?.map((status, i) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <option value={status?.parameterTypeId} code={status?.parameterType}>{status?.parameterType}</option>
                                                                                                    </>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </Form.Select>
                                                                                </Form.Group>
                                                                            </Col>
                                                                        )

                                                                    }





                                                                    {((tab1?.serviceRequestSubStatusId == '28' || tab1?.serviceRequestSubStatusId == '23' || submittedDataTab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "23" || tab1?.serviceRequestSubStatusId == '30' || submittedDataTab1?.serviceRequestSubStatusId == "30") && (Activities?.length > 0)) && (

                                                                        <Col md={4} style={{
                                                                            whiteSpace: 'nowrap'
                                                                        }}>



                                                                            <Form.Group className="text-start">
                                                                                <Form.Label> Type of activity <span className="req-t">*</span></Form.Label>
                                                                                <MultiSelect
                                                                                    options={Activities}
                                                                                    disabled={submitEnabled}


                                                                                    value={addActivity?.typeOfActivity}
                                                                                    onChange={function noRefCheck(e) {
                                                                                        let selectedValue = e.map(item => item.value);
                                                                                        const RemoveValue = (selectedValue) => {
                                                                                            const valuesToRemove = [];

                                                                                            if (selectedValue.includes(75)) valuesToRemove.push(97);
                                                                                            if (selectedValue.includes(97)) valuesToRemove.push(75);
                                                                                            if (selectedValue.includes(98)) valuesToRemove.push(99, 100);
                                                                                            if (selectedValue.includes(99)) valuesToRemove.push(100, 98);
                                                                                            if (selectedValue.includes(100)) valuesToRemove.push(99, 98);
                                                                                            if (selectedValue.includes(60)) valuesToRemove.push(61);
                                                                                            if (selectedValue.includes(61)) valuesToRemove.push(60);


                                                                                            return valuesToRemove;

                                                                                        };
                                                                                        // console.log(e);







                                                                                        // console.log(selectedValue, 's-------------')
                                                                                        let newOptions;

                                                                                        let original = Activities

                                                                                        let allvals = lodash.cloneDeep(Activities);

                                                                                        // console.log(allvals);


                                                                                        if (addActivity?.activeStatusId && selectedValue.length < 1) {

                                                                                            // newOptions = ; 
                                                                                            fetch(
                                                                                                `${process.env.REACT_APP_API_URL}Activity/GetActivityByType?ProductLineCode=${ticketInfo[0]?.productLineCode}&DivisionCode=${ticketInfo[0]?.divisionCode}&ActivityTypeId=${(tab1?.serviceRequestSubStatusId == "23" || tab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "23" || addActivity?.activeSubStatusId == "7" || isWorkshop) ? 164 : (tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") ? 163 : ""}&StatusId=${addActivity?.activeStatusId}&SubStatusid=${addActivity?.activeSubStatusId ? addActivity?.activeSubStatusId : '0'}`,
                                                                                                {
                                                                                                    headers: {
                                                                                                        Authorization: `Bearer ${token}`,
                                                                                                    },
                                                                                                }
                                                                                            )
                                                                                                .then((res) => res.json())
                                                                                                .then((result) => {

                                                                                                    // console.log(result);
                                                                                                    settab4((pre) => {
                                                                                                        return {
                                                                                                            ...pre,
                                                                                                            activityTypeId: result[0]?.activityTypeId

                                                                                                        }
                                                                                                    })
                                                                                                    // console.log(activityID)
                                                                                                    let changedActivities = result?.map((activity, i) => ({ label: activity?.activityName, value: activity?.activityId }))
                                                                                                    // console.log(changedActivities);

                                                                                                    setActivities(changedActivities)
                                                                                                });

                                                                                            // setOptionsypeWorkDone(original);

                                                                                            // console.log("less than 1");
                                                                                            // console.log(original);


                                                                                        }


                                                                                        else {

                                                                                            const valueToRemove = RemoveValue(selectedValue);
                                                                                            newOptions = allvals.filter(item => !valueToRemove.includes(item.value));
                                                                                            setActivities(newOptions);


                                                                                            // const valueToRemove = selectedValue.includes(75) ? 97 :
                                                                                            //     (selectedValue.includes(97) ? 75 : null);


                                                                                            // newOptions = allvals.filter(item => item.value !== valueToRemove);
                                                                                            // setActivities(newOptions);
                                                                                        }




                                                                                        // console.log(newOptions, 'new-----------------')

                                                                                        // setOptionsypeWorkDone(newOptions);























                                                                                        setaddActivity(prev => ({ ...prev, typeOfActivity: e }))
                                                                                        setaddActivityTable(prev => ({ ...prev, typeOfActivity: e }))
                                                                                    }}
                                                                                    hasSelectAll={false}
                                                                                    valueRenderer={customValueRenderer}


                                                                                // labelledBy="Select" 
                                                                                />
                                                                                {/* <Form.Select value={addActivity?.typeOfActivity}
                                                                        disabled={submitEnabled}

                                                                        onChange={(e) => {
                                                                            const selectedStatus = e.target.value;
                                                                            setaddActivity(prev => ({ ...prev, typeOfActivity: selectedStatus }));
                                                                            // Enable submit button if 'Work completed' is selected

                                                                        }}

                                                                    >addActivity?.activeSubStatusId
                                                                        <option value=''>Select</option>
                                                                        {Object.keys(TaskStatuss).map(key => (
                                                                            <option key={key} value={key}>{TaskStatuss[key]}</option>
                                                                        ))}
                                                                    </Form.Select> */}
                                                                            </Form.Group>
                                                                        </Col>
                                                                    )
                                                                    }

                                                                    {/* {(tab1?.serviceRequestSubStatusId == '30' || submittedDataTab1?.serviceRequestSubStatusId == "30") && (

                                                                <Col md={3} style={{
                                                                    whiteSpace: 'nowrap'
                                                                }}>
                                                                    <Form.Group className="text-start">
                                                                        <Form.Label> Type of activity <span className="req-t">*</span></Form.Label>
                                                                        <MultiSelect
                                                                            options={Activities}
                                                                            disabled={submitEnabled}


                                                                            value={addActivity?.typeOfActivity}
                                                                            onChange={function noRefCheck(e) {
                                                                                // console.log(e);

                                                                                setaddActivity(prev => ({ ...prev, typeOfActivity: e }))
                                                                                setaddActivityTable(prev => ({ ...prev, typeOfActivity: e }))
                                                                            }}
                                                                            hasSelectAll={false}
                                                                            valueRenderer={customValueRenderer}


                                                                      
                                                                        />

                                                                    </Form.Group>
                                                                </Col>
                                                            )
                                                            } */}






                                                                    {/* <Col style={{
                                                                marginTop: '28px'
                                                            }} md={1}><Button variant='' className='add-Btn' onClick={handleAddActivityItem}>Add</Button></Col> */}
                                                                    {(addActivity?.date && addActivity?.activeStatusId) ? <Col md={1} style={{
                                                                        marginTop: '26px'
                                                                    }}>
                                                                        <Tooltip
                                                                            arrow
                                                                            placement="right"
                                                                            title="add "
                                                                        >
                                                                            <IconButton
                                                                                className="edit-btn"
                                                                                onClick={handleAddActivityItem}
                                                                            >
                                                                                <FaCirclePlus
                                                                                    color="green"
                                                                                    fontSize={25}
                                                                                />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Col> : ""}



                                                                </Row>}

                                                                <Row className='mt-2'>
                                                                    {addActivityItenTable?.length == 0 ? (
                                                                        ""
                                                                    ) : (
                                                                        <Col md={12}>

                                                                            <Table responsive bordered className="mt-1">
                                                                                <thead>
                                                                                    <tr
                                                                                        style={{
                                                                                            fontSize: "12px",

                                                                                        }}
                                                                                    >
                                                                                        <th className='m-0  pl-1 py-1 align-content-center'> Date</th>
                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Status</th>
                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Sub Status</th>
                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Type of activity</th>
                                                                                        {/* <th className='m-0 pl-1 py-1 align-content-center'>End date</th> */}



                                                                                        {/* action */}
                                                                                        {/* {(ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : (
                                                                                        <th className="m-0 pl-1 py-1 align-content-center">
                                                                                            Actions
                                                                                        </th>
                                                                                    )
                                                                                    } */}


                                                                                        {/* {add?.isSubmited == "1" ?: <th className="m-0 pl-1 py-1 align-content-center">Actions</th>} */}
                                                                                        {/* <th></th> */}


                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {addActivityItenTable?.map((add, index) => {

                                                                                        let activities = add?.typeOfActivity

                                                                                        let activities2 = add?.activityName ? add?.activityName?.split(",") : ""

                                                                                        return (
                                                                                            <tr
                                                                                                style={{
                                                                                                    fontSize: "12px",
                                                                                                }}
                                                                                                key={index}
                                                                                            >
                                                                                                <td className='m-0 pl-1 py-1 align-content-center' style={{ whiteSpace: "nowrap" }}>{add?.date}</td>
                                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{add.activeStatusId ? add.activeStatusId : add?.statusName ? add?.statusName : ""}</td>
                                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{add.activeSubStatusId ? add.activeSubStatusId : add?.subStatusName ? add?.subStatusName : ""}</td>
                                                                                                {/* <td className='m-0 pl-1 py-1 align-content-center'>{add.typeOfActivity ? add.typeOfActivity.map(item => item.label).toString() : add?.activityName ? add?.activityName : ""}</td> */}
                                                                                                <td className='m-0 pl-1 py-1 align-content-center'>


                                                                                                    {
                                                                                                        activities ?
                                                                                                            activities?.map((act, i) => {
                                                                                                                return (
                                                                                                                    <>
                                                                                                                        <ul className='p-0'>
                                                                                                                            <li>{act?.label}</li>
                                                                                                                        </ul>
                                                                                                                    </>
                                                                                                                )
                                                                                                            })
                                                                                                            : activities2 ?
                                                                                                                activities2?.map((act2, i) => {

                                                                                                                    return (
                                                                                                                        <>
                                                                                                                            <ul>
                                                                                                                                <li>{act2}</li>
                                                                                                                            </ul>
                                                                                                                        </>
                                                                                                                    )
                                                                                                                }) : ""
                                                                                                    }
                                                                                                    {
                                                                                                        reassigTech == 'Reassign Technician' ? <IconButton
                                                                                                            className="edit-btn  pl-2 p-0"
                                                                                                            onClick={() => {
                                                                                                                handleShowTechnician();
                                                                                                            }}
                                                                                                        >
                                                                                                            <MdEdit className='p-0 ' fontSize={15} color='#004887' />
                                                                                                        </IconButton> : (
                                                                                                            ""
                                                                                                        )
                                                                                                    }

                                                                                                </td>



                                                                                                {/* {actionButton && (<td className="m-0 pl-1 py-1 align-content-center">
                                                                                          
                                                                                            {add?.isSubmited == "1" ? "" : <Button variant="" onClick={() => handleRemoveRow(index)}>
                                                                                                <FaMinusCircle color='red' />
                                                                                            </Button>}
                                                                                        </td>)
                                                                                        } */}

                                                                                                {/* action */}
                                                                                                {/* {(ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : <td className='text-center'><FaTrash color='red' style={{ cursor: 'pointer' }} fontSize={15} onClick={(e) => {
                                                                                                localStorage.setItem("activityToDelId", add?.ascActivitiesId)
                                                                                                handleShowActDel()
                                                                                            }} /></td>} */}



                                                                                            </tr>
                                                                                        );
                                                                                    })}
                                                                                </tbody>
                                                                            </Table>
                                                                        </Col>
                                                                    )}
                                                                </Row>

                                                            </Form>

                                                            {/* {ticketInfo[0]?.tabActive == "Tab2" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" ? "" : <Row className='p-0 mt-2 justify-content-center align-items-center'>
                                                            <Col md={2}>
                                                                <Button variant='' disabled={addActivityIten?.length < 1} className='add-Btn'
                                                                >Submit</Button>
                                                            </Col>

                                                        </Row>} */}




                                                        </Accordion.Body>

                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey="2">
                                                        <Accordion.Header>
                                                            <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                                                                <p className="m-0">
                                                                    {(serviceTasks || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? (
                                                                        <FaCircleCheck
                                                                            color="#58a718"
                                                                            fontSize={20}
                                                                            className="mr-2"
                                                                        />
                                                                    ) : (
                                                                        <strong className="mr-2">3</strong>
                                                                    )}
                                                                    Service activity/field information report

                                                                </p>
                                                                <span>
                                                                    {/* <Button
                                                                    disabled={!serviceTasks}
                                                                    variant=""
                                                                    style={{
                                                                        outline: "none",
                                                                        border: "none",
                                                                    }}
                                                                >
                                                                    <IoMdSave
                                                                        onClick={() => {
                                                                            setServiceTasks(true);
                                                                            setactiveKeyEdit("5");
                                                                        }}
                                                                        color="#7bc143"
                                                                        fontSize={20}
                                                                    />
                                                                </Button> */}
                                                                    {/* <span>
                                                                    <Button
                                                                        style={{
                                                                            outline: "none",
                                                                            border: "none",
                                                                        }}
                                                                        variant=""
                                                                    >
                                                                        {" "}
                                                                        <IoArrowUpOutline
                                                                            fontSize={15}
                                                                            color="#fff"
                                                                            onClick={() => {
                                                                                // setactiveKeyEdit('1')
                                                                                if (alreadyWorkshoop) {
                                                                                    setactiveKeyEdit("0");
                                                                                } else {
                                                                                    setactiveKeyEdit("1");
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Button>
                                                                </span> */}
                                                                </span>
                                                            </div>
                                                        </Accordion.Header>
                                                        <Accordion.Body className="pt-0 pb-1">



                                                            <>
                                                                <Row>
                                                                    <Col md={2} className="mt-3">
                                                                        <Form.Group>
                                                                            <Form.Label>Product Sr No <span className="req-t">*</span>  </Form.Label>
                                                                            <Form.Control
                                                                                autoComplete="new-password"

                                                                                type="text"
                                                                                name="SerialNo"
                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}

                                                                                value={tab3?.SerialNo}
                                                                                onChange={handleChangeTab3Serial}
                                                                            // value={tab3Data?.SerialNo}


                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={2} className="mt-3">
                                                                        <Form.Group>
                                                                            <Form.Label>Product Code</Form.Label>


                                                                            <Form.Control
                                                                                autoComplete="new-password"

                                                                                type="text"
                                                                                name='ProductCode'
                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}

                                                                                value={tab3?.ProductCode}
                                                                                onChange={handleChangeTab3}
                                                                            // value={tab3Data?.ProductCode}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={2} className="mt-3">
                                                                        <Form.Group>
                                                                            <Form.Label>Division</Form.Label>
                                                                            <Form.Control type='text' value={tab3?.DivisionName}
                                                                                onChange={handleChangeTab3}
                                                                                readOnly />


                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={2} className="mt-3">
                                                                        <Form.Group>
                                                                            <Form.Label>Product Line</Form.Label>
                                                                            <Form.Control type='text' readOnly value={tab3?.productLineName}
                                                                                onChange={handleChangeTab3}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={2} className="mt-3">
                                                                        <Form.Group>
                                                                            <Form.Label>Product Group</Form.Label>
                                                                            <Form.Control type='text' readOnly value={tab3?.ProductGroupCode}
                                                                                onChange={handleChangeTab3}
                                                                            />

                                                                        </Form.Group>
                                                                    </Col>


                                                                    {/* </Row>
                                                        <Row className="mt-2"> */}
                                                                    <Col md={2} className="mt-3" >
                                                                        <Form.Group>
                                                                            <Form.Label>Batch no</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                value={tab3.BatchNo}
                                                                                onChange={handleChangeTab3}

                                                                                // value={tab3Data?.ProductDescription}
                                                                                readOnly
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <Row className='mt-2'>
                                                                    <Col md={4} >
                                                                        <Form.Group>
                                                                            <Form.Label>Product Description</Form.Label>
                                                                            <Form.Control
                                                                                as="textarea"
                                                                                rows={1}
                                                                                value={tab3?.ProductDescription}
                                                                                onChange={handleChangeTab3}

                                                                                // value={tab3Data?.ProductDescription}
                                                                                readOnly
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    {(ticketInfo[0]?.divisionCode == "M3") ?<>
                                                                     <Col md={2} >
                                                                        <Form.Group>
                                                                            <Form.Label>Frame <span className="req-t">*</span> </Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="Frame"
                                                                                autoComplete=''

                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                value={tab3.Frame}
                                                                                onChange={handleChangeTab3}

                                                                            // value={tab3Data?.ProductDescription}

                                                                            />
                                                                        </Form.Group>
                                                                    </Col>

                                                                        <Col md={2} >
                                                                            <Form.Group>
                                                                                <Form.Label>Frame Slot <span className="req-t">*</span> </Form.Label>
                                                                                <Form.Select
                                                                                    // type="text"
                                                                                    name="FrameSizeId"
                                                                                    // autoComplete=''

                                                                                    disabled={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                    value={tab3.FrameSizeId}
                                                                                    onChange={handleChangeTab3}

                                                                                // value={tab3Data?.ProductDescription}

                                                                            >
                                                                                <option value="0">Select</option>
                                                                                {
                                                                                    FrameSlots?.map((slot,i)=>{
                                                                                        return(
                                                                                            <>
                                                                                            <option value={slot?.parameterTypeId}>{slot?.parameterType}</option>
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    </> : ""}
                                                                    {ticketInfo[0]?.productLineCode == "DC" ? <Col md={2} >
                                                                        <Form.Group>
                                                                            <Form.Label>Kva <span className="req-t">*</span></Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                autoComplete='new-password'
                                                                                name="Kva"
                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                value={tab3.Kva}
                                                                                onChange={handleChangeTab3}

                                                                            // value={tab3Data?.ProductDescription}

                                                                            />

                                                                        </Form.Group>
                                                                    </Col> : ""}
                                                                    {ticketInfo[0]?.divisionCode == "M4" ? <Col md={2} >
                                                                        <Form.Group>
                                                                            <Form.Label>Hp</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="Hp"
                                                                                autoComplete='new-password'

                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                value={tab3.Hp}
                                                                                onChange={handleChangeTab3}

                                                                            // value={tab3Data?.ProductDescription}

                                                                            />
                                                                        </Form.Group>
                                                                    </Col> : ""}
                                                                    <Col md={2} >
                                                                        <Form.Group>
                                                                            <Form.Label>Invoice No <span className="req-t">*</span></Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="InvoiceNo"
                                                                                value={tab3.InvoiceNo}
                                                                                onChange={handleChangeTab3}

                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}

                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    {/* {ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir ? tab3?.InvoiceFile ?
                                                                    <Col md={2}>
                                                                        <Form.Group>
                                                                            <Form.Label>Download invoice </Form.Label>
                                                                            <p className='m-0 p-0 text-center'>  <FaDownload
                                                                                fontSize={20} color='#7bc143' style={{ cursor: "pointer" }} className='mx-4 pointer'
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();



                                                                                    const downloadUrl = `${process.env.REACT_APP_API_URL}DownloadFile/DownloadFile?FilePath=${tab3?.InvoiceFile}`;


                                                                                    fetch(downloadUrl, {
                                                                                        headers: {
                                                                                            "Content-Type": "application/json",
                                                                                            "Authorization": `Bearer ${token}`
                                                                                        },

                                                                                    })
                                                                                        .then((res) => {
                                                                                            console.log("logging file response");
                                                                                            console.log(res);
                                                                                            const lastDotIndex = res.url.lastIndexOf(".");
                                                                                            const lastUnderscoreIndex = res.url.lastIndexOf("_");
                                                                                            const fileNameWithExt = res.url.slice(lastUnderscoreIndex + 1);
                                                                                            // const extension = res.url.slice(lastDotIndex + 1);//to get ext

                                                                                            console.log("File Name:", fileNameWithExt);
                                                                                            // console.log("Extension:", extension);
                                                                                            //    console.log(ext);
                                                                                            let resp = res.blob()
                                                                                            resp.then((r) => {
                                                                                                console.log(r);
                                                                                                if (r instanceof Blob) {
                                                                                                    handleDownload(r, fileNameWithExt);
                                                                                                } else {
                                                                                                    // Handle non-Blob responses
                                                                                                    console.error('Response is not a Blob');
                                                                                                }

                                                                                            })
                                                                                        })








                                                                                    // const link = document.createElement('a');
                                                                                    // link.href = "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600";
                                                                                    // link.download = 'downloaded_image.jpeg';
                                                                                    // document.body.appendChild(link);
                                                                                    // link.click();
                                                                                    // document.body.removeChild(link);
                                                                                }}
                                                                            />
                                                                            </p>
                                                                        </Form.Group> </Col> : "" : <Col md={2}>
                                                                    <Form.Group>
                                                                        <Form.Label>Upload invoice copy  <span className="req-t">*</span></Form.Label>
                                                                        <Form.Control type='file' onChange={(e) => {
                                                                            settab3((pre) => {
                                                                                return {
                                                                                    ...pre,
                                                                                    InvoiceFile: e.target.files[0]
                                                                                }
                                                                            })
                                                                        }} />
                                                                    </Form.Group>
                                                                </Col>} */}
                                                                    <Col md={2}>
                                                                        <Form.Group>
                                                                            <Form.Label>Invoice Date <span className="req-t">*</span></Form.Label>
                                                                            <Form.Control
                                                                                autoComplete="new-password"

                                                                                type="date"
                                                                                name='InvoiceDate'
                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                min={minInvoiceDate}
                                                                                max={currentDate}
                                                                                value={moment(
                                                                                    tab3?.InvoiceDate || tab3?.InvoiceDate
                                                                                )?.format("YYYY-MM-DD")}
                                                                                onChange={(e) => {
                                                                                    // const invoiceDate = e.target.value
                                                                                    // const warrantyDate = calculateWarrantydate(invoiceDate);
                                                                                    // // console.log(warrantyDate, 'date-------------------')
                                                                                    const invoiceDateStrr = e.target.value;

                                                                                    // console.log(invoiceDateStrr);
                                                                                    if (invoiceDateStrr) {
                                                                                        const invoiceDate = new Date(invoiceDateStrr);
                                                                                        // console.log(invoiceDate)
                                                                                        const warrantyDate = new Date(invoiceDate);
                                                                                        // console.log(warrantyDate)
                                                                                        warrantyDate.setMonth(invoiceDate.getMonth() + 12);
                                                                                        // console.log(warrantyDate)
                                                                                        warrantyDate.setDate(warrantyDate.getDate() - 1);
                                                                                        // console.log(warrantyDate)
                                                                                        const warrantyDateStrr = warrantyDate.toISOString().split('T')[0];

                                                                                        // console.log(warrantyDateStrr);
                                                                                        //  tab3.warrantyDate = warrantyDateStrr;

                                                                                        // const warrantyDateStrr = warrantyDate.toISOString().split('T')[0];
                                                                                        settab3((pre) => {
                                                                                            return {
                                                                                                ...pre,
                                                                                                InvoiceDate: e.target.value,
                                                                                                warrantyDate: warrantyDateStrr
                                                                                            }
                                                                                        })



                                                                                        fetch(
                                                                                            `${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfoFIR?SerialNo=${tab3?.SerialNo}&ProductCode=${tab3?.productCode || "0"}&InvoiceDate=${tab3?.InvoiceDate || ""}&DivisionCode=${ticketInfo[0]?.divisionCode}`,
                                                                                            {
                                                                                                headers: {
                                                                                                    Authorization: `Bearer ${token}`,
                                                                                                },
                                                                                            }
                                                                                        )
                                                                                            .then((res) => res.json())
                                                                                            .then((result) => {
                                                                                                // console.log(result, 'r-------------------');
                                                                                                if (result[0]?.msgCode === "SAP101") {
                                                                                                    Swal.fire({
                                                                                                        icon: "error",
                                                                                                        title: result[0]?.msg
                                                                                                    });
                                                                                                } else {
                                                                                                    setverifiedWarrantyStatus(result[0]?.warrantyDateStatus)

                                                                                                    setverifiedWarrantyFromInvoice(result[0]?.invoiceDateStatus)

                                                                                                    // let a = result[0]?.batchStartDate;
                                                                                                    // // console.log(a, '11111111111111');
                                                                                                    // a = moment(a).format("YYYY-MM-DD");
                                                                                                    // let d1 = new Date(a);
                                                                                                    // let d2 = new Date(tab1.invoiceDate);
                                                                                                    // // console.log(a, 'a---------');
                                                                                                    // setMinInvoiceDate(a);
                                                                                                    // if (d1 > d2) {
                                                                                                    //     settab3((pre) => ({
                                                                                                    //         ...pre,
                                                                                                    //         invoiceDate: ""
                                                                                                    //     }));
                                                                                                    // }




                                                                                                    // settab3((pre) => ({
                                                                                                    //     ...pre,
                                                                                                    //     SerialNo: result[0]?.serialNo,
                                                                                                    //     ProductCode: result[0]?.productCode || '',
                                                                                                    //     DivisionCode: result[0]?.divisionCode || '',
                                                                                                    //     DivisionName: result[0]?.divisionName || '',
                                                                                                    //     ProductLineCode: result[0]?.productLineCode || '',
                                                                                                    //     ProductLineName: result[0]?.productLineName || '',
                                                                                                    //     ProductGroupCode: result[0]?.productGroupName || '',
                                                                                                    //     ProductDescription: result[0]?.productDescription || '',
                                                                                                    //     BatchNo: result[0]?.batchCode || '',
                                                                                                    //     Frame: result[0]?.frame || '',
                                                                                                    //     Kva: result[0]?.kva || '',
                                                                                                    //     Hp: result[0]?.hp || '',
                                                                                                    //     // warrantyDate: result[0]?.batchEndDate?.split(" ")[0] || '',
                                                                                                    //     // InvoiceFile: result[0]?.invoceFilePath,
                                                                                                    // }));




                                                                                                    settab3((pre) => {
                                                                                                        return {
                                                                                                            ...pre,
                                                                                                            DefectList: []
                                                                                                        }
                                                                                                    })


                                                                                                }
                                                                                            });




                                                                                    }
                                                                                    else {

                                                                                        settab3((pre) => {
                                                                                            return {
                                                                                                ...pre,
                                                                                                InvoiceDate: e.target.value,
                                                                                                // warrantyDate: calculateWarrantydate(invoiceDate)

                                                                                            }
                                                                                        })
                                                                                    }

                                                                                }}

                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <Form.Group>
                                                                            <Form.Label>Warranty  end date</Form.Label>
                                                                            <Form.Control
                                                                                type="date"
                                                                                name="warrantyDate"
                                                                                readOnly
                                                                                // value={tab3?.warrantyDate.moment}
                                                                                value={moment(
                                                                                    tab3?.warrantyDate
                                                                                )?.format("YYYY-MM-DD")}
                                                                                onChange={handleChangeTab3}


                                                                            />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    {/* </Row> */}
                                                                    {
                                                                        ((tab3?.DivisionCode === 'DR' || tab1?.divisionCode === 'DR' || ticketInfo[0]?.divisionCode == "DR") || (tab3?.DivisionCode == 'M7' || tab1?.divisionCode === 'M7' || ticketInfo[0]?.divisionCode == "M7")) && (

                                                                            // <Row className='mt-2'>
                                                                            <>
                                                                                <Col md={2}>
                                                                                    <Form.Label>Date of manufacturing</Form.Label>
                                                                                    <Form.Control type='date' readOnly
                                                                                        name="ManufacturingDate"


                                                                                        value={moment(
                                                                                            tab3?.ManufacturingDate
                                                                                        )?.format("YYYY-MM-DD")}
                                                                                        onChange={handleChangeTab3} />

                                                                                </Col>
                                                                                <Col md={2}>
                                                                                    <Form.Label>Date of dispatch</Form.Label>
                                                                                    <Form.Control type='date' name="DateOfDispatch "
                                                                                        readOnly


                                                                                        value={moment(
                                                                                            tab3?.DateOfDispatch
                                                                                        )?.format("YYYY-MM-DD")}
                                                                                        onChange={handleChangeTab3} />

                                                                                </Col>
                                                                                <Col md={2}>
                                                                                    <Form.Label>Date of commissioning </Form.Label>
                                                                                    <Form.Control type='date' name="DateOfCommissioning"
                                                                                        readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                        min={moment(
                                                                                            tab3?.ManufacturingDate
                                                                                        )?.format("YYYY-MM-DD")}
                                                                                        max={currentDate}
                                                                                        value={moment(
                                                                                            tab3?.DateOfCommissioning
                                                                                        )?.format("YYYY-MM-DD")}
                                                                                        onChange={handleChangeTab3} />

                                                                                </Col>


                                                                                <Col md={2}>
                                                                                    <Form.Label> Failure reported date </Form.Label>
                                                                                    <Form.Control type='date' name="FailureReportedDate"
                                                                                        readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                        min={moment(
                                                                                            tab3?.ManufacturingDate
                                                                                        )?.format("YYYY-MM-DD")}
                                                                                        max={currentDate}
                                                                                        value={moment(
                                                                                            tab3?.FailureReportedDate
                                                                                        )?.format("YYYY-MM-DD")}
                                                                                        onChange={handleChangeTab3} />

                                                                                </Col>

                                                                                <Col md={2}>
                                                                                    <Form.Label> Product Failure date </Form.Label>
                                                                                    <Form.Control type='date' name="ProductFailureDate"
                                                                                        readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                        min={moment(
                                                                                            tab3?.FailureReportedDate
                                                                                        )?.format("YYYY-MM-DD")}
                                                                                        max={currentDate}
                                                                                        value={moment(
                                                                                            tab3?.ProductFailureDate
                                                                                        )?.format("YYYY-MM-DD")}
                                                                                        onChange={handleChangeTab3} />

                                                                                </Col>


                                                                                {/* </Row> */}
                                                                            </>
                                                                        )}
                                                                    {/* <Row className='mt-2'> */}
                                                                    <Col md={2}>

                                                                        <Form.Label>
                                                                            Warranty Status (from batch)
                                                                        </Form.Label>

                                                                        <div>


                                                                            <p style={{
                                                                                display: 'inline-block'
                                                                            }} className={`ticketInfoLabelST m-0 ${verifiedWarrantyStatus == "In Warranty" ? `WStatus` : verifiedWarrantyStatus == "Out Of Warranty" ? "OOWStatus" : verifiedWarrantyStatus == "NA" ? "OOWStatus" : ""}`}>
                                                                                {verifiedWarrantyStatus}

                                                                            </p>
                                                                            {verifiedWarrantyStatus == "NA" ? "" : (
                                                                                <span style={{
                                                                                    fontSize: '12px',
                                                                                    textAlign: 'center',
                                                                                    marginLeft: '2px'
                                                                                }}>{moment(FirOnChangeData?.batchEndDate ? FirOnChangeData?.batchEndDate?.split(" ")[0] : invoiceBatchDate).format('DD-MM-YYYY')}</span>
                                                                            )}
                                                                        </div>
                                                                    </Col>


                                                                    <Col md={2}>

                                                                        <Form.Label>
                                                                            Warranty Status (from invoice)
                                                                        </Form.Label>

                                                                        <div>

                                                                            <p style={{
                                                                                display: 'inline-block'
                                                                            }} className={`ticketInfoLabelST m-0 ${verifiedWarrantyFromInvoice == "In Warranty" ? `WStatus` : verifiedWarrantyFromInvoice == "Out Of Warranty" ? "OOWStatus" : ""}`}>



                                                                                {verifiedWarrantyFromInvoice}


                                                                            </p>
                                                                            <span style={{
                                                                                fontSize: '12px',
                                                                                textAlign: 'center',
                                                                                marginLeft: '2px'
                                                                            }}>{moment(
                                                                                tab3?.warrantyDate
                                                                            )?.format("DD-MM-YYYY")}</span>
                                                                        </div>

                                                                    </Col>
                                                                    {/* {tab3?.invoiceFile ? <Col md={2}>
                                                                <Form.Group>
                                                                    <Form.Label>Download invoice </Form.Label>
                                                                    <p className='m-0 p-0'>  <FaFileDownload fontSize={20} color='green' className='mx-4 pointer' />
                                                                    </p>
                                                                </Form.Group>

                                                            </Col> : ""} */}
                                                                    {ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir ? tab3?.InvoiceFile ?
                                                                        <Col md={2}>
                                                                            <Form.Group>
                                                                                <Form.Label>Download invoice </Form.Label>
                                                                                <p className='m-0 p-0 text-center'>  <FaDownload
                                                                                    fontSize={20} color='#7bc143' style={{ cursor: "pointer" }} className='mx-4 pointer'
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();



                                                                                        const downloadUrl = `${process.env.REACT_APP_API_URL}DownloadFile/DownloadFile?FilePath=${tab3?.InvoiceFile}`;


                                                                                        fetch(downloadUrl, {
                                                                                            headers: {
                                                                                                "Content-Type": "application/json",
                                                                                                "Authorization": `Bearer ${token}`
                                                                                            },

                                                                                        })
                                                                                            .then((res) => {
                                                                                                // console.log("logging file response");
                                                                                                // console.log(res);
                                                                                                const lastDotIndex = res.url.lastIndexOf(".");
                                                                                                const lastUnderscoreIndex = res.url.lastIndexOf("_");
                                                                                                const fileNameWithExt = res.url.slice(lastUnderscoreIndex + 1);
                                                                                                // const extension = res.url.slice(lastDotIndex + 1);//to get ext

                                                                                                // console.log("File Name:", fileNameWithExt);
                                                                                                // // console.log("Extension:", extension);
                                                                                                //    // console.log(ext);
                                                                                                let resp = res.blob()
                                                                                                resp.then((r) => {
                                                                                                    // console.log(r);
                                                                                                    if (r instanceof Blob) {
                                                                                                        handleDownload(r, fileNameWithExt);
                                                                                                    } else {
                                                                                                        // Handle non-Blob responses
                                                                                                        console.error('Response is not a Blob');
                                                                                                    }

                                                                                                })
                                                                                            })








                                                                                        // const link = document.createElement('a');
                                                                                        // link.href = "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600";
                                                                                        // link.download = 'downloaded_image.jpeg';
                                                                                        // document.body.appendChild(link);
                                                                                        // link.click();
                                                                                        // document.body.removeChild(link);
                                                                                    }}
                                                                                />
                                                                                </p>
                                                                            </Form.Group> </Col> : "" : <Col md={2}>
                                                                        <Form.Group>
                                                                            <Form.Label>Upload invoice copy  <span className="req-t">*</span></Form.Label>
                                                                            <Form.Control type='file' onChange={(e) => {
                                                                                settab3((pre) => {
                                                                                    return {
                                                                                        ...pre,
                                                                                        InvoiceFile: e.target.files[0]
                                                                                    }
                                                                                })
                                                                            }} />
                                                                        </Form.Group>
                                                                    </Col>}
                                                                    {
                                                                        (tab3?.DivisionCode == 'M4' || tab1?.divisionCode === 'M4' || ticketInfo[0]?.divisionCode == "M4") && (

                                                                            <Col md={2}>
                                                                                <Form.Group>
                                                                                    <Form.Label>Type of application <span className="req-t">*</span></Form.Label>
                                                                                    <Form.Select
                                                                                        name="TypeOfApplication"
                                                                                        disabled={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}

                                                                                        value={tab3?.TypeOfApplication}
                                                                                        onChange={handleChangeTab3}
                                                                                    >
                                                                                        <option value=''>Select</option>
                                                                                        {
                                                                                            applicationTypes?.map((type, i) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <option value={type?.parameterType} >{type?.parameterType}</option>
                                                                                                    </>
                                                                                                )
                                                                                            })
                                                                                        }


                                                                                    </Form.Select>
                                                                                </Form.Group>
                                                                            </Col>
                                                                        )
                                                                    }
                                                                    <Col md={2}>
                                                                        <Form.Group>
                                                                            <Form.Label>Total no of hours run  </Form.Label>
                                                                            <Form.Control type='number'
                                                                                autoComplete="new-password"

                                                                                name="NoOfHours"
                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                value={tab3?.NoOfHours}
                                                                                onChange={handleChangeTab3}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>






                                                                    {
                                                                        (!verifyFristStepFir && (ticketInfo[0]?.tabActive != "Tab3")) && (

                                                                            <Col style={{
                                                                                marginTop: '30px'
                                                                            }}>
                                                                                {/* <Button variant='' className='add-Btn' onClick={(e) => {
                                                                    setVerifyFristStepFir(true)
                                                                </Button> */}
                                                                                <Tooltip
                                                                                    arrow
                                                                                    placement="right"
                                                                                    title="verify product"
                                                                                >
                                                                                    <Button
                                                                                        variant=''
                                                                                        className="add-Btn"
                                                                                        disabled={notVerify}
                                                                                        onClick={(e) => {
                                                                                            if (tab3?.SerialNo == "") {
                                                                                                Swal.fire({
                                                                                                    icon: "error",
                                                                                                    title: "Product serial number is required!"
                                                                                                })
                                                                                            }
                                                                                            else if ((ticketInfo[0]?.productLineCode != "DC" && ticketInfo[0]?.divisionCode == "M3") && tab3?.Frame == '') {
                                                                                                Swal.fire({
                                                                                                    icon: "error",
                                                                                                    title: "Frame is required!"
                                                                                                })

                                                                                            }
                                                                                            else if (ticketInfo[0]?.productLineCode == "DC" && tab3?.Kva == '') {
                                                                                                Swal.fire({
                                                                                                    icon: "error",
                                                                                                    title: "KVA is required!"
                                                                                                })

                                                                                            }
                                                                                            else if (ticketInfo[0]?.divisionCode == "M4" && tab3?.Hp == '') {
                                                                                                Swal.fire({
                                                                                                    icon: "error",
                                                                                                    title: "HP is required!"
                                                                                                })


                                                                                            }
                                                                                            else if (tab3?.InvoiceNo == "") {
                                                                                                Swal.fire({
                                                                                                    icon: "error",
                                                                                                    title: "Invoice number is required!"
                                                                                                })

                                                                                            }
                                                                                            else if (tab3?.InvoiceDate == "") {
                                                                                                Swal.fire({
                                                                                                    icon: "error",
                                                                                                    title: "Invoice date is required!"
                                                                                                })

                                                                                            }

                                                                                            else if (tab3?.InvoiceFile == "") {
                                                                                                Swal.fire({
                                                                                                    icon: "error",
                                                                                                    title: "Invoice copy is required!"
                                                                                                })

                                                                                            }



                                                                                            // else if (tab3?.NoOfHours == "") {
                                                                                            //     Swal.fire({
                                                                                            //         icon: "error",
                                                                                            //         title: "Total hours run is required!"
                                                                                            //     })


                                                                                            else {
                                                                                                fetch(
                                                                                                    `${process.env.REACT_APP_API_URL}ServiceTicket/GetAllSerialWiseServiceTicketInfo?SerialNo=${tab3?.SerialNo}&ProductCode=${tab3?.ProductCode}&InvoiceDate=${tab3?.InvoiceDate}&DivisionCode=${ticketInfo[0]?.divisionCode}`,
                                                                                                    {
                                                                                                        headers: {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                        },
                                                                                                    }
                                                                                                )
                                                                                                    .then((res) => res.json())
                                                                                                    .then((result) => {
                                                                                                        console.log(result[0]?.warrantyDateStatus);

                                                                                                        if (result[0]?.serialNo === tab3?.SerialNo) {
                                                                                                            if (result[0]?.warrantyDateStatus) {
                                                                                                                setVerifyFristStepFir(true);


                                                                                                                let obj = {
                                                                                                                    AscServiceTicketFIRId: 0,
                                                                                                                    ServiceTicketId: serTicId,
                                                                                                                    SerialNo: tab3?.SerialNo,
                                                                                                                    ProductCode: tab3?.ProductCode,
                                                                                                                    DivisionCode: tab3?.DivisionCode,
                                                                                                                    ProductLineCode: tab3?.ProductLineCode,
                                                                                                                    InvoiceNo: tab3?.InvoiceNo,
                                                                                                                    InvoiceDate: tab3?.InvoiceDate,
                                                                                                                    TypeOfApplication: tab3?.TypeOfApplication,
                                                                                                                    NoOfHours: tab3?.NoOfHours,
                                                                                                                    Frame: tab3?.Frame,
                                                                                                                    Kva: tab3?.Kva,
                                                                                                                    Hp: tab3?.Hp,
                                                                                                                    warrantyDate: tab3?.warrantyDate,
                                                                                                                    InvoiceFile: tab3?.InvoiceFile,
                                                                                                                    ManufacturingDate: tab3?.ManufacturingDate,
                                                                                                                    DateOfDispatch: tab3?.DateOfDispatch,
                                                                                                                    DateOfCommissioning: tab3?.DateOfCommissioning,
                                                                                                                    FailureReportedDate: tab3?.FailureReportedDate,
                                                                                                                    ProductFailureDate: tab3?.ProductFailureDate,
                                                                                                                    FrameSizeId: tab3?.FrameSizeId


                                                                                                                }


                                                                                                                const formData = new FormData();
                                                                                                                Object.keys(obj).forEach(
                                                                                                                    (key) => {
                                                                                                                        if (key == "InvoiceFile") {
                                                                                                                            formData.append(key, obj[key]);
                                                                                                                        } else {
                                                                                                                            formData.append(key, obj[key]);
                                                                                                                        }
                                                                                                                    }
                                                                                                                );
                                                                                                                fetch(
                                                                                                                    `${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/InsertAscServiceTicketProductFIR`,
                                                                                                                    {
                                                                                                                        method: "POST",
                                                                                                                        headers: {
                                                                                                                            // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                                        },
                                                                                                                        body: formData,
                                                                                                                    }
                                                                                                                ).then((res) => {
                                                                                                                    let resp = res.text();
                                                                                                                    resp.then((r) => {
                                                                                                                        console.log(r);
                                                                                                                        let regextest = /^[0-9]*$/;
                                                                                                                        if (r.match(regextest)) {
                                                                                                                            // console.log();

                                                                                                                            getSubmittedData()

                                                                                                                        }
                                                                                                                    })
                                                                                                                })



                                                                                                                // fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                                                                                                                //     headers: {
                                                                                                                //         Authorization: `Bearer ${token}`,
                                                                                                                //     },
                                                                                                                // })
                                                                                                                //     .then((res) => res.json())
                                                                                                                //     .then((result) => {
                                                                                                                //         // console.log(result);
                                                                                                                //         setOptionsypeWorkDone(result?.map((activity) => ({ value: activity?.activityId, label: activity?.activityName })))

                                                                                                                //     })









                                                                                                                fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=39&Id=0&Code=${tab3?.DivisionCode}`, {
                                                                                                                    headers: {
                                                                                                                        Authorization: `Bearer ${token}`,
                                                                                                                    },
                                                                                                                })
                                                                                                                    .then((res) => res.json())
                                                                                                                    .then((resultingDocumentTypes) => {
                                                                                                                        // console.log(resultingDocumentTypes);

                                                                                                                        setdocumentTypeList(resultingDocumentTypes)
                                                                                                                    })
                                                                                                            }
                                                                                                            else {
                                                                                                                if (result[0]?.msgCode === 'SAP105') {
                                                                                                                    Swal.fire({
                                                                                                                        title: 'Service request already exists',
                                                                                                                        icon: 'warning'
                                                                                                                    });
                                                                                                                }
                                                                                                                else {
                                                                                                                    setVerifyFristStepFir(true);

                                                                                                                    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=39&Id=0&Code=${tab3?.DivisionCode}`, {
                                                                                                                        headers: {
                                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                                        },
                                                                                                                    })
                                                                                                                        .then((res) => res.json())
                                                                                                                        .then((resultingDocumentTypes) => {
                                                                                                                            // console.log(resultingDocumentTypes);

                                                                                                                            setdocumentTypeList(resultingDocumentTypes)

                                                                                                                        })

                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            setVerifyFristStepFir(true);


                                                                                                            fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=39&Id=0&Code=${tab3?.DivisionCode}`, {
                                                                                                                headers: {
                                                                                                                    Authorization: `Bearer ${token}`,
                                                                                                                },
                                                                                                            })
                                                                                                                .then((res) => res.json())
                                                                                                                .then((resultingDocumentTypes) => {
                                                                                                                    console.log(resultingDocumentTypes);

                                                                                                                    setdocumentTypeList(resultingDocumentTypes)

                                                                                                                })


                                                                                                        }





                                                                                                    })

                                                                                            }

                                                                                        }}
                                                                                    >
                                                                                        <MdVerifiedUser fontSize={20} />


                                                                                    </Button>
                                                                                </Tooltip>
                                                                            </Col>
                                                                        )
                                                                    }

                                                                </Row>

                                                            </>





                                                            {
                                                                (verifyFristStepFir || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") &&
                                                                (
                                                                    <Row className="gap-3 mt-3 " >

                                                                        <Col className='p-3 m-2'
                                                                            style={{
                                                                                boxShadow: "0px 0px 3px 3px #d4d4d4",
                                                                                borderRadius: "8px"
                                                                            }} >
                                                                            <p className="m-0 p-0 pg-label pl-2">Defect </p>
                                                                            <hr />
                                                                            <Row className="mb-2" >
                                                                                {ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" ? "" :
                                                                                    <> <Col md={5}>
                                                                                        <Form.Group>
                                                                                            <Form.Label>Defect Category <span className="req-t">*</span></Form.Label>
                                                                                            <Form.Select
                                                                                                value={
                                                                                                    addDefectCategoryOption?.defectCategoryId
                                                                                                }
                                                                                                onChange={(e) => {
                                                                                                    let selectedIndex = e.target.selectedIndex

                                                                                                    setAddDefectCategoryOption({
                                                                                                        ...addDefectCategoryOption,
                                                                                                        defectCategoryId: e.target.value,
                                                                                                    })
                                                                                                    setAddDefectCategoryOptionTable({
                                                                                                        ...addDefectCategoryOptionTable,
                                                                                                        defectCategoryItem: e.target.options[selectedIndex].getAttribute("code"),
                                                                                                    })



                                                                                                    fetch(`${process.env.REACT_APP_API_URL}Defect/GetAllDefect?DefectCategoryId=${e.target.value}`, {
                                                                                                        headers: {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                        },
                                                                                                    })
                                                                                                        .then((res) => res.json())
                                                                                                        .then((result) => {
                                                                                                            // console.log(result);
                                                                                                            setallDefects(result)

                                                                                                        })
                                                                                                }
                                                                                                }

                                                                                            >

                                                                                                <option value=''>Select</option>
                                                                                                {
                                                                                                    defectCategories?.map((defectCat, i) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <option value={defectCat?.defectCategoryId} code={defectCat?.defectCategoryName}>{defectCat?.defectCategoryName}</option>
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }

                                                                                            </Form.Select>
                                                                                        </Form.Group>
                                                                                    </Col>

                                                                                        <Col md={5}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Sub defect <span className="req-t">*</span> </Form.Label>
                                                                                                <Form.Select
                                                                                                    value={
                                                                                                        addDefectCategoryOption?.defectId
                                                                                                    }
                                                                                                    onChange={(e) => {
                                                                                                        let selectedIndex = e.target.selectedIndex


                                                                                                        setAddDefectCategoryOption({
                                                                                                            ...addDefectCategoryOption,
                                                                                                            defectId: e.target.value,
                                                                                                        })
                                                                                                        setAddDefectCategoryOptionTable({
                                                                                                            ...addDefectCategoryOptionTable,
                                                                                                            defectItem: e.target.options[selectedIndex].getAttribute("code"),
                                                                                                        })
                                                                                                    }
                                                                                                    }

                                                                                                >
                                                                                                    <option value="Select">Select</option>
                                                                                                    {
                                                                                                        allDefects?.map((defect, i) => {
                                                                                                            return (
                                                                                                                <>
                                                                                                                    <option value={defect?.defectId} code={defect?.defectDesc}>{defect?.defectDesc}</option>
                                                                                                                </>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>

                                                                                        <Col md={1} className="mt-4">
                                                                                            <Tooltip
                                                                                                arrow
                                                                                                placement="right"
                                                                                                title="add defect"
                                                                                            >
                                                                                                <IconButton
                                                                                                    className="edit-btn"
                                                                                                    // disabled={verifyFristSecondFir}

                                                                                                    onClick={handleAddDefect}
                                                                                                >
                                                                                                    <FaCirclePlus
                                                                                                        color="green"
                                                                                                        fontSize={20}
                                                                                                    />
                                                                                                </IconButton>
                                                                                            </Tooltip>
                                                                                        </Col></>}
                                                                                {defectListTable.length == 0 ? (
                                                                                    ""
                                                                                ) : (
                                                                                    <div style={{
                                                                                        maxHeight: '200px',
                                                                                        overflowY: 'scroll'
                                                                                    }}>

                                                                                        <Row className='m-0 p-0 align-items-end'>
                                                                                            <Col md={12} className='m-0 p-0'>
                                                                                                <Table responsive bordered className="mt-1 m-0 p-0">
                                                                                                    <thead className='docTable'>
                                                                                                        <tr
                                                                                                            style={{
                                                                                                                fontSize: "12px",
                                                                                                            }}
                                                                                                        >
                                                                                                            <th className='m-0 pl-1 py-1 text-center'>Defect category</th>
                                                                                                            <th className='m-0 pl-1 py-1 text-center'>Sub defect</th>
                                                                                                            {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : <th className='m-0 pl-1 py-1 text-center'>Actions</th>}
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        {defectListTable?.map((add, index) => {
                                                                                                            return (
                                                                                                                <tr
                                                                                                                    style={{
                                                                                                                        fontSize: "12px",
                                                                                                                    }}
                                                                                                                    key={index}
                                                                                                                >
                                                                                                                    <td className='m-0 pl-1 py-0 align-content-center'>{add?.defectCategoryItem}</td>
                                                                                                                    <td className='m-0 pl-1 py-0 align-content-center'>{add?.defectItem}</td>
                                                                                                                    {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : <td className='m-0 pl-1 py-0 text-center'>
                                                                                                                        {" "}
                                                                                                                        <Tooltip
                                                                                                                            arrow
                                                                                                                            placement="right"
                                                                                                                            title="remove"
                                                                                                                        >
                                                                                                                            <IconButton
                                                                                                                                // disabled={verifyFristSecondFir}

                                                                                                                                className="edit-btn"
                                                                                                                                onClick={() =>
                                                                                                                                    handleRemoveButtonClick(
                                                                                                                                        index
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            >
                                                                                                                                <FaCircleMinus
                                                                                                                                    color="red"
                                                                                                                                    fontSize={20}
                                                                                                                                />
                                                                                                                            </IconButton>
                                                                                                                        </Tooltip>
                                                                                                                    </td>}
                                                                                                                </tr>
                                                                                                            );
                                                                                                        })}
                                                                                                    </tbody>
                                                                                                </Table>


                                                                                            </Col>
                                                                                        </Row>
                                                                                    </div>
                                                                                )}
                                                                                <Row>
                                                                                    <Col >
                                                                                        <Form.Group>
                                                                                            <Form.Label>Failure observation <span className="req-t">*</span></Form.Label>
                                                                                            <Form.Control as='textarea' rows={3}
                                                                                                name="FailureObservation"
                                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}
                                                                                                value={tab3?.FailureObservation}
                                                                                                onChange={handleChangeTab3}
                                                                                            />
                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Row>

                                                                        </Col>


                                                                        <Col className='p-3 m-2' style={{
                                                                            boxShadow: "0px 0px 3px 3px #d4d4d4",
                                                                            // maxWidth: '50%'
                                                                            borderRadius: "8px"


                                                                        }}>
                                                                            <p className="m-0 p-0 pg-label pl-2">Document upload </p>
                                                                            {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : <p className='px-2' style={{ fontSize: "12px" }}><b><u>Note:</u></b> Document Types marked with <span className='req-t'>*</span> are mandatory</p>}
                                                                            <hr />
                                                                            {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : <>
                                                                                <Row className="mr-1">

                                                                                    <Col className='p-auto'>

                                                                                        {/* <Table border='1' bordered style={{ fontSize: "12px" }}>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Label</th>
                                                                                            <th>File</th>
                                                                                            <th>Actions</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {rows.map((row, index) => (
                                                                                            <tr key={index}>
                                                                                                <td>
                                                                                                    {row.isMandatory ? (
                                                                                                        row.label
                                                                                                    ) : (
                                                                                                        <input
                                                                                                            type='text'
                                                                                                            style={{ width: "-webkit-fill-available" }}
                                                                                                            value={row.label}
                                                                                                            onChange={event => handleLabelChange(index, event)}
                                                                                                        />
                                                                                                    )} {row?.isMandatory ? <span className='req-t'>*</span> : ""}
                                                                                                </td>
                                                                                                <td>
                                                                                                    <Form.Control
                                                                                                        type='file'
                                                                                                        name='DocumentFile'
                                                                                                        onChange={event => handleFileChange(index, event)}
                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    {!row.isMandatory && (
                                                                                                        <Tooltip
                                                                                                            arrow
                                                                                                            placement="right"
                                                                                                            title="remove document"
                                                                                                        >
                                                                                                            <IconButton
                                                                                                                className=""
                                                                                                                onClick={() => removeRow(index)}
                                                                                                            >
                                                                                                                <FaCircleMinus
                                                                                                                    color="red"
                                                                                                                    fontSize={20}
                                                                                                                />


                                                                                                            </IconButton>
                                                                                                        </Tooltip>
                                                                                                        //   <button onClick={() => removeRow(index)}>-</button>
                                                                                                    )}
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </Table> */}


                                                                                        <Form id="DocumentsForm">

                                                                                            <Row>
                                                                                                <Col md={5}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Document Type <span className='req-t'>*</span></Form.Label>
                                                                                                        <Form.Select onChange={(e) => {
                                                                                                            let selectedIndex = e.target.selectedIndex

                                                                                                            //  e.target.options[selectedIndex].getAttribute("code") 

                                                                                                            // console.log(e.target.value);

                                                                                                            setuploadDocuments((pre) => {
                                                                                                                return {
                                                                                                                    ...pre,
                                                                                                                    DocumentId: e.target.value,
                                                                                                                    IsMandatory: e.target.options[selectedIndex].getAttribute("code")
                                                                                                                }
                                                                                                            })

                                                                                                            // console.log(uploadDocuments);

                                                                                                        }}>
                                                                                                            <option value="0">Select</option>
                                                                                                            {
                                                                                                                documentTypeList?.map((type, i) => {
                                                                                                                    return (
                                                                                                                        <>
                                                                                                                            <option value={type?.parameterTypeId} code={type?.isRequired}><span>{(type?.parameterTypeId == "13" || type?.parameterTypeId == "14" || type?.parameterTypeId == "15") ? <span className='req-t'>*</span> : ""}</span> {type?.parameterType}</option>
                                                                                                                        </>
                                                                                                                    )
                                                                                                                })
                                                                                                            }
                                                                                                        </Form.Select>
                                                                                                    </Form.Group>
                                                                                                </Col>
                                                                                                <Col md={5}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Document File <span className='req-t'>*</span></Form.Label>
                                                                                                        <Form.Control type='file' onChange={(e) => {
                                                                                                            setuploadDocuments((pre) => {
                                                                                                                return {
                                                                                                                    ...pre,
                                                                                                                    DocumentWithType: e.target.files[0]
                                                                                                                }
                                                                                                            })


                                                                                                            // console.log(uploadDocuments);

                                                                                                        }} />

                                                                                                    </Form.Group>
                                                                                                </Col>
                                                                                                <Col md={2}>
                                                                                                    <Button variant='' className='mt-4' onClick={(e) => {
                                                                                                        e.preventDefault();

                                                                                                        if (uploadDocuments?.DocumentId == "" || uploadDocuments?.DocumentId == "0") {
                                                                                                            Swal.fire({
                                                                                                                icon: "error",
                                                                                                                title: "Document type is required!"
                                                                                                            })
                                                                                                        }
                                                                                                        else if (uploadDocuments?.DocumentWithType == "" || uploadDocuments?.DocumentWithType == undefined) {
                                                                                                            Swal.fire({
                                                                                                                icon: "error",
                                                                                                                title: "Document file is required!"
                                                                                                            })
                                                                                                        }
                                                                                                        else {

                                                                                                            let n = {
                                                                                                                ...uploadDocuments,
                                                                                                                IsMandatory: uploadDocuments?.IsMandatory == "True" ? true : false
                                                                                                            }

                                                                                                            const formData = new FormData();
                                                                                                            Object.keys(n).forEach(key => {
                                                                                                                if (key == 'DocumentWithType') {
                                                                                                                    formData.append(key, n[key]);
                                                                                                                } else {
                                                                                                                    formData.append(key, n[key]);
                                                                                                                }
                                                                                                            });
                                                                                                            fetch(`${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/InsertAscServiceTicketFIRDocument`, {
                                                                                                                method: "POST",
                                                                                                                headers: {
                                                                                                                    // "Content-Type": "multipart/form-data", //will automatically detect content type hence commented
                                                                                                                    "Authorization": `Bearer ${token}`
                                                                                                                },
                                                                                                                body: formData
                                                                                                            })
                                                                                                                .then((res) => {
                                                                                                                    let resp = res.text()
                                                                                                                    resp.then((r) => {
                                                                                                                        let digitregex = /^\d+$/;
                                                                                                                        if (r.match(digitregex)) {
                                                                                                                            // console.log(r);

                                                                                                                            fetchAllDocuments()


                                                                                                                            let docForm = document.getElementById("DocumentsForm");

                                                                                                                            docForm.reset();


                                                                                                                            setuploadDocuments((pre) => {
                                                                                                                                return {
                                                                                                                                    ...pre,
                                                                                                                                    DocumentId: "",
                                                                                                                                    DocumentWithType: ""
                                                                                                                                }
                                                                                                                            }
                                                                                                                            )
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            Swal.fire({
                                                                                                                                icon: 'error',
                                                                                                                                title: "Error uploading document!"
                                                                                                                            })
                                                                                                                        }
                                                                                                                    })
                                                                                                                })
                                                                                                        }




                                                                                                    }}>  <FaCirclePlus
                                                                                                            color="green"
                                                                                                            fontSize={20}
                                                                                                        /></Button>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </Form>

                                                                                    </Col>

                                                                                    {/* <Col className='m-0 p-0 d-flex  ' style={{
                                                                                    flexDirection: 'column-reverse'
                                                                                }}>
                                                                                    <Tooltip
                                                                                        arrow
                                                                                        placement="right"
                                                                                        title="Upload other documents"
                                                                                    >
                                                                                        <IconButton
                                                                                            className="edit-btn"
                                                                                            onClick={addRow}
                                                                                        >
                                                                                          


                                                                                        </IconButton>
                                                                                    </Tooltip></Col> */}




                                                                                </Row>
                                                                            </>}


                                                                            {/* <p className="m-0 mt-2 p-0 pg-label pl-2">Documents </p> */}

                                                                            {allDocuments?.length > 0 ? <Table responsive bordered className="mt-1 m-0 p-0" style={{ fontSize: "12px" }}>
                                                                                <thead className='docTable'>
                                                                                    <tr>
                                                                                        <th className='m-0 pl-1 py-1 text-center'>Document Type</th>
                                                                                        <th className='m-0 pl-1 py-1 text-center'>Document Name</th>
                                                                                        <th className='m-0 pl-1 py-1 text-center'>Upload Date</th>
                                                                                        {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : <th className='m-0 pl-1 py-1 text-center'>Actions</th>}
                                                                                    </tr>
                                                                                </thead>

                                                                                <tbody>
                                                                                    {
                                                                                        allDocuments?.map((document, i) => {

                                                                                            const docPath = document?.docPath || '';
                                                                                            const [firstPart, restOfString] = docPath.split(/_(.+)/);
                                                                                            return (
                                                                                                <>
                                                                                                    <tr>
                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{document?.documentName}</td>
                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'><p style={{ cursor: "pointer", color: "blue" }} onClick={(e) => {
                                                                                                            e.preventDefault();



                                                                                                            const downloadUrl = `${process.env.REACT_APP_API_URL}DownloadFile/DownloadFile?FilePath=${document?.docPath}`;


                                                                                                            fetch(downloadUrl, {
                                                                                                                headers: {
                                                                                                                    "Content-Type": "application/json",
                                                                                                                    "Authorization": `Bearer ${token}`
                                                                                                                },

                                                                                                            })
                                                                                                                .then((res) => {
                                                                                                                    // console.log("logging file response");
                                                                                                                    // console.log(res);
                                                                                                                    const lastDotIndex = res.url.lastIndexOf(".");
                                                                                                                    const lastUnderscoreIndex = res.url.lastIndexOf("_");
                                                                                                                    const fileNameWithExt = res.url.slice(lastUnderscoreIndex + 1);
                                                                                                                    // const extension = res.url.slice(lastDotIndex + 1);//to get ext

                                                                                                                    // console.log("File Name:", fileNameWithExt);
                                                                                                                    // // console.log("Extension:", extension);
                                                                                                                    //    // console.log(ext);
                                                                                                                    let resp = res.blob()
                                                                                                                    resp.then((r) => {
                                                                                                                        // console.log(r);
                                                                                                                        if (r instanceof Blob) {
                                                                                                                            handleDownload(r, fileNameWithExt);
                                                                                                                        } else {
                                                                                                                            // Handle non-Blob responses
                                                                                                                            console.error('Response is not a Blob');
                                                                                                                        }

                                                                                                                    })
                                                                                                                })








                                                                                                            // const link = document.createElement('a');
                                                                                                            // link.href = "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600";
                                                                                                            // link.download = 'downloaded_image.jpeg';
                                                                                                            // document.body.appendChild(link);
                                                                                                            // link.click();
                                                                                                            // document.body.removeChild(link);
                                                                                                        }} ><u>{restOfString}</u></p></td>
                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{moment(document?.createOn?.split(" ")[0])?.format("DD-MM-YYYY")}</td>
                                                                                                        {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : <td className='m-0 pl-1 py-1 text-center'><FaTrash color='red' style={{ cursor: "pointer" }} onClick={(e) => {
                                                                                                            localStorage.setItem("documentToDelId", document?.firDocumentId)
                                                                                                            handleShowDocDel()
                                                                                                        }} /></td>}
                                                                                                    </tr>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </tbody>
                                                                            </Table> : <div className='d-flex justify-content-center align-item-center'><p>No photos/documents</p></div>}

                                                                        </Col>
                                                                        {
                                                                            ((!verifyFristSecondFir) && (ticketInfo[0]?.tabActive == "Tab1" || ticketInfo[0]?.tabActive == "Tab2")) ? (


                                                                                <Col className='m-2 p-0' md={1} style={{
                                                                                    flexDirection: 'column-reverse',
                                                                                    display: 'flex'
                                                                                }}>
                                                                                    {/* <Button variant='' className='add-Btn' onClick={(e) => {
                                                                            setVerifyFristSecondFir(true)
                                                                        }}>Verify defect</Button> */}
                                                                                    <Tooltip
                                                                                        arrow
                                                                                        placement="right"
                                                                                        title="verify defect"
                                                                                    >
                                                                                        <Button
                                                                                            variant=''
                                                                                            className="add-Btn"
                                                                                            onClick={(e) => {
                                                                                                const validationDocument = getValidationDocument();


                                                                                                let filteredParameterTypes = documentTypeList?.filter(param =>
                                                                                                    ["13", "14", "15"].includes(param?.parameterTypeId)
                                                                                                );

                                                                                                let areAllParameterTypesPresent = filteredParameterTypes?.every(param =>
                                                                                                    allDocuments?.some(doc => doc.documentName == param.parameterType)
                                                                                                );

                                                                                                // console.log(areAllParameterTypesPresent);


                                                                                                if (defectListTable.length == "") {
                                                                                                    Swal.fire({
                                                                                                        icon: "error",
                                                                                                        title: "Defect is required"
                                                                                                    })
                                                                                                }


                                                                                                else if (tab3?.FailureObservation == '') {
                                                                                                    Swal.fire({
                                                                                                        icon: "error",
                                                                                                        title: "Failure observation is required!"
                                                                                                    })
                                                                                                }
                                                                                                else if (!areAllParameterTypesPresent) {
                                                                                                    Swal.fire({
                                                                                                        icon: "error",
                                                                                                        title: "Please add all required documents marked with *!"
                                                                                                    })
                                                                                                }


                                                                                                // else if (validationDocument.length > 0) {
                                                                                                //     Swal.fire({
                                                                                                //         icon: "error",
                                                                                                //         title: "Photo upload document is required!"
                                                                                                //     })
                                                                                                // }


                                                                                                else if (ticketInfo[0]?.divisionCode != 'M7') {

                                                                                                    setVerifyFristSecondFir(true)
                                                                                                    fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                                                                                                        headers: {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                        },
                                                                                                    })
                                                                                                        .then((res) => res.json())
                                                                                                        .then((result) => {
                                                                                                            // console.log(result);
                                                                                                            // setOptionsypeWorkDone(result?.activityName)
                                                                                                            if (Array.isArray(result)) {
                                                                                                                setOptionsypeWorkDone(result.map((activity) => ({
                                                                                                                    value: activity.activityId,
                                                                                                                    label: activity.activityName
                                                                                                                })));
                                                                                                            }


                                                                                                        })
                                                                                                }
                                                                                                else {
                                                                                                    setVerifyFristSecondFir(true)
                                                                                                }
                                                                                            }


                                                                                            }

                                                                                        >
                                                                                            <MdVerifiedUser fontSize={20} />


                                                                                        </Button>
                                                                                    </Tooltip>

                                                                                </Col>
                                                                            ) : ""

                                                                        }






                                                                    </Row>

                                                                )
                                                            }







                                                            {
                                                                (verifyFristSecondFir || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") && (

                                                                    <Row className='gap-3 mt-3 ' style={{
                                                                        flexWrap: 'wrap'


                                                                    }}>

                                                                        <div style={{
                                                                            boxShadow: "0px 0px 3px 3px #d4d4d4",
                                                                            maxWidth: '100%'

                                                                        }}>
                                                                            <p className='pg-label p-0 m-0 pl-2'>Closure</p>

                                                                            {ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" ? "" : <Row>
                                                                                <Col md={4}>
                                                                                    <Form.Group>
                                                                                        <Form.Label>Part consumption <span className="req-t">*</span></Form.Label>
                                                                                        <div className='d-flex gap-4 mx-2'>

                                                                                            <Form.Check type='radio' label="Yes" name='partConsumption' onChange={(e) => {
                                                                                                if (e.target.checked) {
                                                                                                    // getClosureStatus()


                                                                                                    setpartConsumption(true)

                                                                                                    // let filterStatus=clousureStatus?.filter(i=>i?.parameterTypeId=="203")
                                                                                                    // // console.log(filterStatus);
                                                                                                    // setClousureStatus(filterStatus)

                                                                                                    // settab3((pre) => {
                                                                                                    //     return {
                                                                                                    //         ...pre,
                                                                                                    //         ClosureStatusId: "203"
                                                                                                    //     }
                                                                                                    // })



                                                                                                    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=35&Code=${tab3?.DivisionCode ? tab3?.DivisionCode : 0}`, {
                                                                                                        headers: {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                        },
                                                                                                    })
                                                                                                        .then((res) => res.json())
                                                                                                        .then((result) => {
                                                                                                            // console.log(result);
                                                                                                            let filterRewinding = result?.filter(i => i?.parameterTypeId == "203")
                                                                                                            console.log(filterRewinding);

                                                                                                            setClousureStatus(filterRewinding)

                                                                                                            settab3((pre) => {
                                                                                                                return {
                                                                                                                    ...pre,
                                                                                                                    ClosureStatusId: "203"
                                                                                                                }
                                                                                                            })
                                                                                                        })




                                                                                                    setselectPartConsumption("selected")

                                                                                                }


                                                                                            }} />
                                                                                            <Form.Check type='radio' label="No" name='partConsumption' onChange={(e) => {
                                                                                                setpartConsumption(false)
                                                                                                setselectPartConsumption("selected")

                                                                                                settab3((pre) => {
                                                                                                    return {
                                                                                                        ...pre,
                                                                                                        ClosureStatusId: "0",
                                                                                                        SpareList: []
                                                                                                    }
                                                                                                })
                                                                                                if (e.target.checked && !submittedDataTab2?.some(i => i?.activityName?.includes("Rewinding"))) {





                                                                                                    getClosureStatus()
                                                                                                    // let filterClosure = clousureStatus?.filter(i => i?.parameterTypeId != "203")

                                                                                                    // setClousureStatus(filterClosure)


                                                                                                }
                                                                                                else if (e.target.checked && submittedDataTab2?.some(i => i?.activityName?.includes("Rewinding"))) {
                                                                                                    // getClosureStatus()


                                                                                                    fetch(`${process.env.REACT_APP_API_URL}Common/GetAllCommon?mode=35&Code=${tab3?.DivisionCode ? tab3?.DivisionCode : 0}`, {
                                                                                                        headers: {
                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                        },
                                                                                                    })
                                                                                                        .then((res) => res.json())
                                                                                                        .then((result) => {
                                                                                                            // console.log(result);
                                                                                                            let filterRewinding = result?.filter(i => i?.parameterTypeId == "214")
                                                                                                            console.log(filterRewinding);

                                                                                                            setClousureStatus(filterRewinding)

                                                                                                            settab3((pre) => {
                                                                                                                return {
                                                                                                                    ...pre,
                                                                                                                    ClosureStatusId: "214"
                                                                                                                }
                                                                                                            })
                                                                                                        })



                                                                                                }

                                                                                            }} />
                                                                                        </div>

                                                                                    </Form.Group>
                                                                                </Col>


                                                                                {
                                                                                    ((ticketInfo[0]?.divisionCode == "M7") && (selectPartConsumption == "selected" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4")) ? (
                                                                                        <>
                                                                                            <Col md={4}>
                                                                                                <Form.Group>
                                                                                                    <Form.Label>Select Engineer / Techiniacin <span className="req-t">*</span></Form.Label>

                                                                                                    <div className='d-flex gap-4 mx-2'>
                                                                                                        <Form.Group>
                                                                                                            <Form.Check
                                                                                                                type='checkbox'
                                                                                                                label="Engineer"
                                                                                                                name='engSelect'
                                                                                                                onChange={(e) => {
                                                                                                                    setShowCity(true)
                                                                                                                    setselectTechCity1(false)
                                                                                                                    setselectTechCity2(false)
                                                                                                                    setSelectTech("Selected");
                                                                                                                    const isChecked = e.target.checked;


                                                                                                                    console.log(engSelect);
                                                                                                                    fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                                                                                                                        headers: {
                                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                                        },
                                                                                                                    })
                                                                                                                        .then((res) => res.json())
                                                                                                                        .then((result) => {
                                                                                                                            if (e.target.checked) {
                                                                                                                                setEngSelect(true)

                                                                                                                                let filterEngg = result?.filter(item => item.activityId != '10042' &&
                                                                                                                                    item.activityId != '10048' &&
                                                                                                                                    item.activityId != '10050' &&
                                                                                                                                    item.activityId != '10045' &&

                                                                                                                                    item.activityId != '10047' &&
                                                                                                                                    item.activityId != '10049');
                                                                                                                                console.log('Filtered Activities:', filterEngg);
                                                                                                                                setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                    value: activity?.activityId,
                                                                                                                                    label: activity?.activityName
                                                                                                                                })));
                                                                                                                            } else if (!e.target.checked) {
                                                                                                                                setEngSelect(false)
                                                                                                                                setShowCity(false)

                                                                                                                                let filterEngg = result?.filter(item => item.activityId != '10043' &&
                                                                                                                                    item.activityId != '10047' &&
                                                                                                                                    item.activityId != '10049' &&
                                                                                                                                    item.activityId != '10048' &&
                                                                                                                                    item.activityId != '10044' &&

                                                                                                                                    item.activityId != '10050');
                                                                                                                                console.log('Filtered Activities:', filterEngg);
                                                                                                                                setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                    value: activity?.activityId,
                                                                                                                                    label: activity?.activityName
                                                                                                                                })));
                                                                                                                            }
                                                                                                                        })
                                                                                                                        .catch(err => console.error('Fetch error:', err));


                                                                                                                    // Catch and log errors
                                                                                                                }} />
                                                                                                        </Form.Group>
                                                                                                        <Form.Group>
                                                                                                            <Form.Check
                                                                                                                type='checkbox'
                                                                                                                label="Technicain"
                                                                                                                name='techSelect'
                                                                                                                onChange={(e) => {
                                                                                                                    setShowCity(true)

                                                                                                                    setselectTechCity1(false)
                                                                                                                    setselectTechCity2(false)
                                                                                                                    const isChecked = e.target.checked;
                                                                                                                    setSelectTech("Selected");


                                                                                                                    fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                                                                                                                        headers: {
                                                                                                                            Authorization: `Bearer ${token}`,
                                                                                                                        },
                                                                                                                    })
                                                                                                                        .then((res) => res.json())
                                                                                                                        .then((result) => {
                                                                                                                            if (e.target.checked) {
                                                                                                                                setTechSelect(true)
                                                                                                                                let filterEngg = result?.filter(item => item.activityId != '10043' &&
                                                                                                                                    item.activityId != '10047' &&
                                                                                                                                    item.activityId != '10048' &&

                                                                                                                                    item.activityId != '10049' &&
                                                                                                                                    item.activityId != '10045' &&
                                                                                                                                    item.activityId != '10050');

                                                                                                                                console.log(filterEngg);
                                                                                                                                setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                    value: activity?.activityId,
                                                                                                                                    label: activity?.activityName
                                                                                                                                })));
                                                                                                                            } else if (!e.target.checked) {
                                                                                                                                setTechSelect(false)
                                                                                                                                setShowCity(false)



                                                                                                                                let filterEngg = result?.filter(item => item.activityId != '10042' &&
                                                                                                                                    item.activityId != '10048' &&
                                                                                                                                    item.activityId != '10044' &&

                                                                                                                                    item.activityId != '10050' &&
                                                                                                                                    item.activityId != '10047' &&
                                                                                                                                    item.activityId != '10049');

                                                                                                                                console.log(filterEngg);
                                                                                                                                setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                    value: activity?.activityId,
                                                                                                                                    label: activity?.activityName
                                                                                                                                })));
                                                                                                                            }
                                                                                                                        })
                                                                                                                        .catch(err => console.error('Fetch error:', err));

                                                                                                                }} />
                                                                                                        </Form.Group>

                                                                                                    </div>
                                                                                                </Form.Group>
                                                                                            </Col>
                                                                                            {(ticketInfo[0]?.divisionCode == "M7" && submittedDataTab2?.some(i => i?.activityName?.includes("Coveyance")) && (showCity)) ? <Col md={4}>

                                                                                                <Form.Group>
                                                                                                    <Form.Label>Select City <span className="req-t">*</span></Form.Label>
                                                                                                    <div className='d-flex gap-4 mx-2'>

                                                                                                        <Form.Check type='radio' label="Metro City" checked={selectTechCity1} name='metroCity'
                                                                                                            onChange={(e) => {


                                                                                                                setselectTechCity1(true)

                                                                                                                setShowTypeOfWorkDone(true)



                                                                                                                fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                                                                                                                    headers: {
                                                                                                                        Authorization: `Bearer ${token}`,
                                                                                                                    },
                                                                                                                })
                                                                                                                    .then((res) => res.json())
                                                                                                                    .then((result) => {
                                                                                                                        if (e.target.checked && engSelect && techSelect) {
                                                                                                                            let filterEngg = result?.filter(item => item.activityId != '10049' &&
                                                                                                                                item.activityId == '10050')

                                                                                                                            console.log('Filtered Activities:', filterEngg);
                                                                                                                            setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                value: activity?.activityId,
                                                                                                                                label: activity?.activityName
                                                                                                                            })));
                                                                                                                        }
                                                                                                                        else if (e.target.checked && engSelect) {

                                                                                                                            let filterEngg = result?.filter(item => item.activityId != '10042' &&
                                                                                                                                item.activityId != '10048' && item.activityId != '10049' && item.activityId != 10045 && item.activityId != '10050')

                                                                                                                            console.log('Filtered Activities:', filterEngg);
                                                                                                                            setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                value: activity?.activityId,
                                                                                                                                label: activity?.activityName
                                                                                                                            })));
                                                                                                                        } else if (e.target.checked && techSelect) {
                                                                                                                            let filterEngg = result?.filter(item => item.activityId != '10043' &&
                                                                                                                                item.activityId != '10047' && item.activityId != '10049' && item.activityId != '10044' && item.activityId != '10050')

                                                                                                                            console.log('Filtered Activities:', filterEngg);
                                                                                                                            setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                value: activity?.activityId,
                                                                                                                                label: activity?.activityName
                                                                                                                            })));

                                                                                                                        }
                                                                                                                    })
                                                                                                                    .catch(err => console.error('Fetch error:', err));

                                                                                                                // Catch and log errors
                                                                                                            }} />
                                                                                                        <Form.Check type='radio' label="Non Metro City" checked={selectTechCity2} name='metroCity'
                                                                                                            onChange={(e) => {


                                                                                                                setselectTechCity2(true)



                                                                                                                setShowTypeOfWorkDone(true)


                                                                                                                fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                                                                                                                    headers: {
                                                                                                                        Authorization: `Bearer ${token}`,
                                                                                                                    },
                                                                                                                })
                                                                                                                    .then((res) => res.json())
                                                                                                                    .then((result) => {
                                                                                                                        if (e.target.checked && engSelect && techSelect) {

                                                                                                                            let filterEngg = result?.filter(item => item.activityId != '10047' &&
                                                                                                                                item.activityId != '10048')

                                                                                                                            console.log('Filtered Activities:', filterEngg);
                                                                                                                            setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                value: activity?.activityId,
                                                                                                                                label: activity?.activityName
                                                                                                                            })));
                                                                                                                        }
                                                                                                                        else if (e.target.checked && engSelect) {

                                                                                                                            let filterEngg = result?.filter(item => item.activityId != '10047' &&
                                                                                                                                item.activityId != '10048' && item.activityId != '10042' && item.activityId != '10044' && item.activityId != '10050')

                                                                                                                            console.log('Filtered Activities:', filterEngg);
                                                                                                                            setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                value: activity?.activityId,
                                                                                                                                label: activity?.activityName
                                                                                                                            })));
                                                                                                                        } else if (e.target.checked && techSelect) {
                                                                                                                            let filterEngg = result?.filter(item => item.activityId != '10047' &&
                                                                                                                                item.activityId != '10048' && item.activityId != '10043' && item.activityId != '10045' && item.activityId != '10049')

                                                                                                                            console.log('Filtered Activities:', filterEngg);
                                                                                                                            setOptionsypeWorkDone(filterEngg?.map((activity) => ({
                                                                                                                                value: activity?.activityId,
                                                                                                                                label: activity?.activityName
                                                                                                                            })));
                                                                                                                        }
                                                                                                                    })
                                                                                                                    .catch(err => console.error('Fetch error:', err));

                                                                                                                // Catch and log errors
                                                                                                            }} />
                                                                                                    </div>

                                                                                                </Form.Group>
                                                                                            </Col> : ""}
                                                                                        </>
                                                                                    )
                                                                                        : ""

                                                                                }
                                                                            </Row>
                                                                            }

                                                                            {
                                                                                partConsumption ?
                                                                                    <Row>
                                                                                        <Col md={12}>
                                                                                            <Row>
                                                                                                <Col md={3}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Spare <span className="req-t">*</span></Form.Label>
                                                                                                        <ReactSearchAutocomplete
                                                                                                            items={spareListDivision}
                                                                                                            onSearch={handleOnSearch}
                                                                                                            onHover={handleOnHover}
                                                                                                            onSelect={handleOnSelect}
                                                                                                            onFocus={handleOnFocus}
                                                                                                            autoFocus
                                                                                                            formatResult={formatResult}
                                                                                                            fuseOptions={{ keys: ["spareCode", "spareDescription"] }}
                                                                                                            resultStringKeyName="spareCode"
                                                                                                        />
                                                                                                    </Form.Group>
                                                                                                </Col>
                                                                                                <Col md={1} className='m-0 p-0 d-flex' style={{ flexDirection: 'column-reverse' }}>
                                                                                                    <Tooltip arrow placement="right" title="spare add">
                                                                                                        <IconButton className="edit-btn" onClick={spareAdd}>
                                                                                                            <FaCirclePlus color="green" fontSize={15} />
                                                                                                        </IconButton>
                                                                                                    </Tooltip>
                                                                                                </Col>
                                                                                            </Row>

                                                                                            {spareList?.length === 0 ? null : (
                                                                                                <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                                                                                    <Row className='m-0 p-0'>
                                                                                                        <Col md={12} className='m-0 p-0'>
                                                                                                            <Table responsive bordered className="m-0 mt-1">
                                                                                                                <thead>
                                                                                                                    <tr style={{ fontSize: "12px" }}>
                                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Spare</th>
                                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Spare desc</th>
                                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Quantity</th>
                                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>SerialNo</th>
                                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Action</th>
                                                                                                                    </tr>
                                                                                                                </thead>
                                                                                                                <tbody className='p-0 m-0'>
                                                                                                                    {spareList?.map((add, index) => {
                                                                                                                        const quantity = quantities[index] || add.quantity || 0;
                                                                                                                        return (
                                                                                                                            <tr style={{ fontSize: "12px" }} key={index}>
                                                                                                                                <td className='m-0 py-2 pl-1 p-0 align-content-center'>
                                                                                                                                    <Form.Group>
                                                                                                                                        <Form.Control value={`${add.spareid} ${add.desc}`} type="text" readOnly />
                                                                                                                                    </Form.Group>
                                                                                                                                </td>
                                                                                                                                <td className='m-0 py-2 pl-1 p-0 align-content-center'>
                                                                                                                                    <Form.Group>
                                                                                                                                        <Form.Control type="text" value={add.desc} readOnly />
                                                                                                                                    </Form.Group>
                                                                                                                                </td>
                                                                                                                                <td className='m-0 py-2 pl-1 p-0 align-content-center'>
                                                                                                                                    <Form.Group>
                                                                                                                                        <Form.Control
                                                                                                                                            type="number"
                                                                                                                                            value={quantity}
                                                                                                                                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                                                                                                        />
                                                                                                                                    </Form.Group>
                                                                                                                                </td>
                                                                                                                                <td className='m-0 py-2 pl-1 p-0 align-content-center'>
                                                                                                                                    {
                                                                                                                                        (ticketInfo[0]?.divisionCode == "M4" && add.desc?.includes("BEARING")) ||
                                                                                                                                            (ticketInfo[0]?.divisionCode == "CP" && ticketInfo[0]?.productLineCode == "C1" && add.desc?.includes("BEARING")) ||
                                                                                                                                            (ticketInfo[0]?.divisionCode == "CP" && ticketInfo[0]?.productLineCode == "FD" && add.desc?.includes("CAPACITOR")) ||
                                                                                                                                            (ticketInfo[0]?.divisionCode == "M3" && ticketInfo[0]?.productLineCode == "DC" && (add.desc?.includes("AVR MODEL") || add.desc?.includes("AVR  MODEL") || add.desc?.includes("AVR MODLE"))) ?
                                                                                                                                            <div>
                                                                                                                                                {quantity > 0 && Array.from({ length: quantity }, (_, serialIndex) => (
                                                                                                                                                    <Form.Group key={serialIndex} className="mb-1">
                                                                                                                                                        <Form.Control
                                                                                                                                                            type="text"
                                                                                                                                                            placeholder='Enter serial number'
                                                                                                                                                            value={serialNumbers[index]?.[serialIndex] || ''}
                                                                                                                                                            onChange={(e) => handleSerialNumberChange(index, serialIndex, e.target.value)}
                                                                                                                                                        />
                                                                                                                                                    </Form.Group>
                                                                                                                                                ))}
                                                                                                                                            </div>
                                                                                                                                            : ""}
                                                                                                                                </td>
                                                                                                                                <td className='m-0 pl-1 py-0 align-content-center'>
                                                                                                                                    <Tooltip arrow placement="right" title="remove">
                                                                                                                                        <IconButton className="edit-btn" onClick={() => handleRemoveSpare(index)}>
                                                                                                                                            <FaCircleMinus color="red" fontSize={20} />
                                                                                                                                        </IconButton>
                                                                                                                                    </Tooltip>
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                        );
                                                                                                                    })}
                                                                                                                </tbody>
                                                                                                            </Table>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                </div>
                                                                                            )}



                                                                                        </Col>
                                                                                    </Row> : ""

                                                                            }


                                                                            {
                                                                                (submittedSpareList?.length > 0 && submittedDataTab3?.closureStatusName == "Resolved by repair with replacement of spare") ?
                                                                                    <Row>
                                                                                        <Col md={6}>
                                                                                            <p className='pg-label'>Spares</p>
                                                                                            <Table responsive bordered style={{ fontSize: '12px' }}>
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        <th>Spare Name</th>
                                                                                                        <th>Quantity</th>
                                                                                                        <th>Serial Numbers</th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {
                                                                                                        submittedSpareList?.map((spare, i) => {
                                                                                                            return (

                                                                                                                <tr>
                                                                                                                    <td>{spare?.spareName}</td>
                                                                                                                    <td>{spare?.quantity}</td>
                                                                                                                    <td>{spare?.serialNumbers}</td>
                                                                                                                </tr>

                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </tbody>
                                                                                            </Table>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    : ""
                                                                            }


                                                                            {(selectPartConsumption == "selected" || ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ?
                                                                                <Row className='mt-1 mb-2 '>
                                                                                    <Col md={4}>
                                                                                        <Form.Group>
                                                                                            <Form.Label>Closure Status <span className="req-t">*</span></Form.Label>
                                                                                            {ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" ? <Form.Control type='text' value={tab3?.ClosureStatusId} readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"} /> : <Form.Select
                                                                                                name="ClosureStatusId"
                                                                                                value={tab3?.ClosureStatusId}
                                                                                                onChange={handleChangeTab3}
                                                                                                disabled={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}
                                                                                            >
                                                                                                <option value=''>Select</option>
                                                                                                {clousureStatus?.map((SType, i) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <option value={SType?.parameterTypeId}>
                                                                                                                {SType?.parameterType}
                                                                                                            </option>
                                                                                                        </>
                                                                                                    );
                                                                                                })}

                                                                                            </Form.Select>}
                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                    {
                                                                                        (ticketInfo[0]?.productLineCode != "DC" && ticketInfo[0]?.divisionCode == "M3" && FrameList?.length > 0) ?
                                                                                            <Col md={4}>
                                                                                                <Form.Group>
                                                                                                    <Form.Label>Type of Frame</Form.Label>
                                                                                                    <Form.Select
                                                                             
                                                                             autoComplete='new-password'
                                                                            //  name="Kva"
                                                                            //  disabled={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                             value={selectedFrameTypes}
                                                                            onChange={(e) =>{
                                                                                setselectedFrameTypes(e.target.value)


                                                                                console.log(e.target.value);

                                                                            }
                                                                            }

                                                                         // value={tab3Data?.ProductDescription}

                                                                         >
                                                                             <option value="0">Select</option>
                                                                             {
                                                                                 FrameList?.map((AllFrames,i)=>{
                                                                                     return(
                                                                                         <>
                                                                                         <option value={AllFrames?.parameterType}>{AllFrames?.parameterType}</option>
                                                                                         </>
                                                                                     )
                                                                                 })
                                                                             }
                                                                         </Form.Select>
                                                                                                    {/* <MultiSelect
                                                                                                        options={FrameList}
                                                                                                        disabled={submitEnabled}


                                                                                                        value={selectedFrameTypes}
                                                                                                        onChange={function noRefCheck(e) {
                                                                                                            setselectedFrameTypes(e)


                                                                                                            console.log(e);

                                                                                                        }
                                                                                                        }
                                                                                                        // onChange={function noRefCheck(e) {
                                                                                                        //     let selectedValue = e.map(item => item.value);
                                                                                                        //     const RemoveValue = (selectedValue) => {
                                                                                                        //         const valuesToRemove = [];

                                                                                                        //         if (selectedValue.includes(75)) valuesToRemove.push(97);
                                                                                                        //         if (selectedValue.includes(97)) valuesToRemove.push(75);
                                                                                                        //         if (selectedValue.includes(98)) valuesToRemove.push(99, 100);
                                                                                                        //         if (selectedValue.includes(99)) valuesToRemove.push(100, 98);
                                                                                                        //         if (selectedValue.includes(100)) valuesToRemove.push(99, 98);

                                                                                                        //         return valuesToRemove;

                                                                                                        //     };
                                                                                                        //     // console.log(e);







                                                                                                        //     // console.log(selectedValue, 's-------------')
                                                                                                        //     let newOptions;

                                                                                                        //     let original = Activities

                                                                                                        //     let allvals = lodash.cloneDeep(Activities);

                                                                                                        //     // console.log(allvals);


                                                                                                        //     if (addActivity?.activeStatusId && selectedValue.length < 1) {

                                                                                                        //         // newOptions = ; 
                                                                                                        //         fetch(
                                                                                                        //             `${process.env.REACT_APP_API_URL}Activity/GetActivityByType?ProductLineCode=${ticketInfo[0]?.productLineCode}&DivisionCode=${ticketInfo[0]?.divisionCode}&ActivityTypeId=${(tab1?.serviceRequestSubStatusId == "23" || tab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "28" || submittedDataTab1?.serviceRequestSubStatusId == "23" || addActivity?.activeSubStatusId == "7" || isWorkshop) ? 164 : (tab1?.serviceRequestSubStatusId == "30" || submittedDataTab1?.serviceRequestSubStatusId == "30") ? 163 : ""}&StatusId=${addActivity?.activeStatusId}&SubStatusid=${addActivity?.activeSubStatusId ? addActivity?.activeSubStatusId : '0'}`,
                                                                                                        //             {
                                                                                                        //                 headers: {
                                                                                                        //                     Authorization: `Bearer ${token}`,
                                                                                                        //                 },
                                                                                                        //             }
                                                                                                        //         )
                                                                                                        //             .then((res) => res.json())
                                                                                                        //             .then((result) => {

                                                                                                        //                 // console.log(result);
                                                                                                        //                 settab4((pre) => {
                                                                                                        //                     return {
                                                                                                        //                         ...pre,
                                                                                                        //                         activityTypeId: result[0]?.activityTypeId

                                                                                                        //                     }
                                                                                                        //                 })
                                                                                                        //                 // console.log(activityID)
                                                                                                        //                 let changedActivities = result?.map((activity, i) => ({ label: activity?.activityName, value: activity?.activityId }))
                                                                                                        //                 // console.log(changedActivities);

                                                                                                        //                 setActivities(changedActivities)
                                                                                                        //             });

                                                                                                        //         // setOptionsypeWorkDone(original);

                                                                                                        //         // console.log("less than 1");
                                                                                                        //         // console.log(original);


                                                                                                        //     }


                                                                                                        //     else {

                                                                                                        //         const valueToRemove = RemoveValue(selectedValue);
                                                                                                        //         newOptions = allvals.filter(item => !valueToRemove.includes(item.value));
                                                                                                        //         setActivities(newOptions);


                                                                                                        //         // const valueToRemove = selectedValue.includes(75) ? 97 :
                                                                                                        //         //     (selectedValue.includes(97) ? 75 : null);


                                                                                                        //         // newOptions = allvals.filter(item => item.value !== valueToRemove);
                                                                                                        //         // setActivities(newOptions);
                                                                                                        //     }




                                                                                                        //     // console.log(newOptions, 'new-----------------')

                                                                                                        //     // setOptionsypeWorkDone(newOptions);























                                                                                                        //     setaddActivity(prev => ({ ...prev, typeOfActivity: e }))
                                                                                                        //     setaddActivityTable(prev => ({ ...prev, typeOfActivity: e }))
                                                                                                        // }}
                                                                                                        hasSelectAll={false}
                                                                                                        valueRenderer={customValueRenderer}


                                                                                                    // labelledBy="Select" 
                                                                                                    /> */}
                                                                                                </Form.Group>
                                                                                            </Col> : ""
                                                                                    }

                                                                                    {(ticketInfo[0]?.productLineCode == "DC" && KVAList?.length > 0) ? <Col md={4}>
                                                                                        <Form.Group>
                                                                                            <Form.Label>Type of KVA</Form.Label>
                                                                                            <Form.Select

                                                                                                autoComplete='new-password'
                                                                                                //  name="Kva"
                                                                                                //  disabled={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4" || verifyFristStepFir}
                                                                                                //  value={tab3.Kva}
                                                                                                onChange={(e) => {
                                                                                                    setselectedKVA(e.target.value)
                                                                                                }}

                                                                                            // value={tab3Data?.ProductDescription}

                                                                                            >
                                                                                                <option value="0">Select</option>
                                                                                                {
                                                                                                    KVAList?.map((AllKva, i) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <option value={AllKva?.parameterType}>{AllKva?.parameterType}</option>
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </Form.Select>
                                                                                        </Form.Group>

                                                                                    </Col> : ""}
                                                                                    {/* {
                                                                                ticketInfo[0]?.divisionCode == "CP" && ( */}
                                                                                    {(tab3?.ClosureStatusId == "202" ||
                                                                                        submittedDataTab3?.closureStatusName == "Replacement from dealer") ? <Col>
                                                                                        <Form.Group>
                                                                                            <Form.Label>Replacement tag photo</Form.Label>
                                                                                            {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? <p><FaDownload /></p> : <Form.Control type='file' name='ReplacementTagFile' onChange={handleChangeTab3} />}
                                                                                        </Form.Group>
                                                                                    </Col> : ""}
                                                                                    {/* )

                                                                            }

                                                                            
                                                                            {
                                                                                ticketInfo[0]?.divisionCode == "CP" && ( */}
                                                                                    {(tab3?.ClosureStatusId == "202" ||
                                                                                        submittedDataTab3?.closureStatusName == "Replacement from dealer") ? <Col md={4}>
                                                                                        <Form.Group>
                                                                                            <Form.Label style={{
                                                                                                whiteSpace: 'nowrap'
                                                                                            }}>Replacement tag applied <span className="req-t">*</span></Form.Label>
                                                                                            <Form.Control type='text' name='ReplacementTagApplied' readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"} value={tab3?.ReplacementTagApplied} onChange={handleChangeTab3} />

                                                                                        </Form.Group>
                                                                                    </Col> : ""}
                                                                                    {/* )
                                                                            } */}


                                                                                    {(ticketInfo[0]?.divisionCode == "CP" && (submittedTypeOfWorkDone?.length > 0 || optionsypeWorkdone?.length > 0)) ? <Col md={4}>

                                                                                        <Form.Group>
                                                                                            <Form.Label>Type of work done </Form.Label>
                                                                                            {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? submittedTypeOfWorkDone?.map((workDone, i) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <ul>
                                                                                                            <li>{workDone}</li>
                                                                                                        </ul>
                                                                                                    </>
                                                                                                )
                                                                                            }) : optionsypeWorkdone?.length > 0 ? <Form.Select name='TypeOfWorkDone' disabled={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"} onChange={handleChangeTab3}>
                                                                                                <option value="Select">Select</option>
                                                                                                {
                                                                                                    optionsypeWorkdone?.map((workDone, i) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <option value={workDone?.value}>{workDone?.label}</option>
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </Form.Select> : ""}
                                                                                        </Form.Group>

                                                                                    </Col> : (submittedTypeOfWorkDone?.length > 0 || optionsypeWorkdone?.length > 0) ? <Col md={4}>
                                                                                        <Form.Group>
                                                                                            {(submittedTypeOfWorkDone?.length > 0 || optionsypeWorkdone?.length > 0) ? <Form.Label>Type of work done </Form.Label> : ""}
                                                                                            {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? submittedTypeOfWorkDone?.map((workDone, i) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <ul>
                                                                                                            <li>{workDone}</li>
                                                                                                        </ul>
                                                                                                    </>
                                                                                                )
                                                                                            }) : (optionsypeWorkdone?.length > 0) ? <MultiSelect
                                                                                                options={optionsypeWorkdone}
                                                                                                value={tab3?.TypeOfWorkDoneId}
                                                                                                disabled={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}
                                                                                                onChange={function noRefCheck(e) {
                                                                                                    // console.log(e, 'e----------------')

                                                                                                    let selectedValue = e.map(item => item.value)
                                                                                                    // console.log(selectedValue, 's-------------')
                                                                                                    let newOptions;

                                                                                                    let original = optionsypeWorkdone

                                                                                                    let allvals = lodash.cloneDeep(optionsypeWorkdone);

                                                                                                    // console.log(allvals);


                                                                                                    if (selectedValue.length < 1 && ticketInfo[0]?.divisionCode == 'M4' && ticketInfo[0]?.divisionCode == 'CP' && ticketInfo[0]?.divisionCode == 'M3') {

                                                                                                        // newOptions = ; 
                                                                                                        fetch(`${process.env.REACT_APP_API_URL}Activity/GetAllTypeOfWorkDone?serviceTicketId=${serTicId}&FrameSizeType=""&KVAType=""`, {
                                                                                                            headers: {
                                                                                                                Authorization: `Bearer ${token}`,
                                                                                                            },
                                                                                                        })
                                                                                                            .then((res) => res.json())
                                                                                                            .then((result) => {
                                                                                                                // console.log(result);
                                                                                                                // setOptionsypeWorkDone(result?.activityName)
                                                                                                                setOptionsypeWorkDone(result?.map((activity) => ({ value: activity?.activityId, label: activity?.activityName })))

                                                                                                            })

                                                                                                        // setOptionsypeWorkDone(original);

                                                                                                        // console.log("less than 1");
                                                                                                        // console.log(original);


                                                                                                    } else {

                                                                                                        if (selectedValue?.includes(10110) || selectedValue?.includes(10109)) {


                                                                                                            const valueToRemove = selectedValue.includes(10110) ? 10109 :
                                                                                                                (selectedValue.includes(10109) ? 10110 : null);


                                                                                                            let newOptions = allvals.filter(item => item.value !== valueToRemove);
                                                                                                            setOptionsypeWorkDone(newOptions);

                                                                                                        }


                                                                                                        if (selectedValue?.includes(10058) || selectedValue?.includes(10059) || selectedValue?.includes(10060) || selectedValue?.includes(10032) || selectedValue?.includes(10033) || selectedValue?.includes(10034)) {

                                                                                                            const valuesToRemove = [];
                                                                                                            if (selectedValue.includes(10058)) {
                                                                                                                valuesToRemove.push(10059, 10060);
                                                                                                            }
                                                                                                            if (selectedValue.includes(10059)) {
                                                                                                                valuesToRemove.push(10058, 10060);
                                                                                                            }
                                                                                                            if (selectedValue.includes(10060)) {
                                                                                                                valuesToRemove.push(10058, 10059);
                                                                                                            }
                                                                                                            if (selectedValue.includes(10032)) {
                                                                                                                valuesToRemove.push(10033, 10034);
                                                                                                            }
                                                                                                            if (selectedValue.includes(10033)) {
                                                                                                                valuesToRemove.push(10032, 10034);
                                                                                                            } if (selectedValue.includes(10034)) {
                                                                                                                valuesToRemove.push(10032, 10033);
                                                                                                            }


                                                                                                            const newOptions = allvals.filter(item => !valuesToRemove.includes(item.value));


                                                                                                            setOptionsypeWorkDone(newOptions);
                                                                                                        }

                                                                                                    }

                                                                                                    // // console.log(newOptions, 'new-----------------')

                                                                                                    // setOptionsypeWorkDone(newOptions);




                                                                                                    settab3((pre) => {
                                                                                                        return {
                                                                                                            ...pre,
                                                                                                            TypeOfWorkDoneId: e
                                                                                                        }
                                                                                                    })
                                                                                                }}

                                                                                                valueRenderer={customValueRenderer}
                                                                                                // labelledBy={"Select"}
                                                                                                hasSelectAll={false}
                                                                                            /> : ""}
                                                                                        </Form.Group>
                                                                                    </Col> : ""}
                                                                                    <Col md={4}>
                                                                                        <Form.Group>
                                                                                            <Form.Label>Details of work done <span className="req-t">*</span></Form.Label>
                                                                                            <Form.Control as='textarea' rows='2' name="DetailsOfWorkDone"
                                                                                                value={tab3?.DetailsOfWorkDone}
                                                                                                readOnly={ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4"}
                                                                                                onChange={handleChangeTab3} />
                                                                                        </Form.Group>
                                                                                    </Col>


                                                                                    {/* {addFirdata?.typeOfworkDone.some(item => item.value === "Bearing replacement at Site / ASC") ? (
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Bearing make & serial Number</Form.Label>
                                <Form.Control type='text' />

                            </Form.Group>
                        </Col>) : ''

                    } */}

                                                                                </Row> : ""}
                                                                            {/* <Row style={{
                                                                            alignContent: 'flex-start'
                                                                        }}>
                                                                            <p className='m-0 p-0 pg-label ml-2'>Devition cliam request</p>
                                                                            <Col md={3}>
                                                                                <Form.Group className='mt-4'>
                                                                                    <Form.Check type='checkbox' label="Early travel (before 7:30 AM)"

                                                                                        placeholder=''
                                                                                    />
                                                                                </Form.Group>

                                                                            </Col>
                                                                            <Col md={3}>
                                                                                <Form.Group className='mt-4'>
                                                                                    <Form.Check type='checkbox' label="Logistic charges"
                                                                                        onChange={handleCheckboxChangeLogistic}



                                                                                        placeholder=''
                                                                                    />
                                                                                </Form.Group>

                                                                            </Col>
                                                                            <Col md={3}>
                                                                                <Form.Group className='mt-4'>
                                                                                    <Form.Check type='checkbox' label="Chnages in distance"
                                                                                        onChange={handleCheckboxChange}

                                                                                        placeholder=''
                                                                                    />
                                                                                </Form.Group>

                                                                            </Col>
                                                                        </Row> */}
                                                                            {/* <Row className='mb-2'>
                                                                            {showDetails && (

                                                                                <>
                                                                                    <Row>


                                                                                        <Col md={3}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Distance:</Form.Label>
                                                                                                <Form.Control type='text' />

                                                                                            </Form.Group>
                                                                                        </Col><Col md={3}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Current distance</Form.Label>
                                                                                                <Form.Control type='text' readOnly />

                                                                                            </Form.Group>
                                                                                        </Col><Col md={3}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Remarks:</Form.Label>
                                                                                                <Form.Control as='textarea' rows='2' />

                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Row className="justify-content-center text-center">
                                                                                        <Col lg={12} md={6} sm={12}>
                                                                                            <Form.Check
                                                                                                type="radio"
                                                                                                label="Same day"
                                                                                                name="radioGroup"
                                                                                                value="sameday"

                                                                                                checked={selectedOptionradio === 'sameday'}
                                                                                                onChange={handleRadioChangeradio}

                                                                                                style={{
                                                                                                    color: "#000",
                                                                                                    fontWeight: "400",
                                                                                                    fontSize: "12px",
                                                                                                    textAlign: "left",
                                                                                                    margin: "15px 15px 0px 0px",
                                                                                                    display: "inline-block",
                                                                                                }}

                                                                                            />
                                                                                            <Form.Check
                                                                                                type="radio"
                                                                                                label="Overnight Stay"
                                                                                                name="radioGroup"
                                                                                                value="overnight"
                                                                                                checked={selectedOptionradio === 'overnight'}
                                                                                                onChange={handleRadioChangeradio}



                                                                                                style={{
                                                                                                    color: "#000",
                                                                                                    fontWeight: "400",
                                                                                                    fontSize: "12px",
                                                                                                    textAlign: "left",
                                                                                                    margin: "15px 15px 0px 0px",
                                                                                                    display: "inline-block",
                                                                                                }}
                                                                                            />
                                                                                        </Col>

                                                                                        {selectedOptionradio === 'sameday' && (
                                                                                            <Row className=' text-start justify-content-center align-items-center mb-2'>
                                                                                                <Col md={4}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Model of Travel <span className="req-t">*</span></Form.Label>
                                                                                                        <Form.Select


                                                                                                        >
                                                                                                            <option value=''>Select</option>
                                                                                                            <option value='Bike'>Bike</option>
                                                                                                            <option value='car'>Car</option>


                                                                                                        </Form.Select>
                                                                                                    </Form.Group>
                                                                                                </Col>
                                                                                            </Row>


                                                                                        )}

                                                                                    </Row>

                                                                                </>

                                                                            )}
                                                                            {
                                                                                showDetailsLogistic && (
                                                                                    <><Col md={3}>
                                                                                        <Form.Group>
                                                                                            <Form.Label>Logistic charge</Form.Label>
                                                                                            <Form.Control type='text' />
                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                        <Col md={3}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Attachment type</Form.Label>
                                                                                                <Form.Select><option value='Attachment'>Logistic Approval</option></Form.Select>
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col md={3}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Attachment Name</Form.Label>
                                                                                                <Form.Control type='text' />
                                                                                            </Form.Group>
                                                                                        </Col>
                                                                                        <Col md={3}>
                                                                                            <Form.Group>
                                                                                                <Form.Label>Attachment file</Form.Label>
                                                                                                <Form.Control type='file' />
                                                                                            </Form.Group>
                                                                                        </Col>

                                                                                    </>

                                                                                )
                                                                            }
                                                                        </Row> */}

                                                                        </div>



                                                                        {(ticketInfo[0]?.tabActive == "Tab3" || ticketInfo[0]?.tabActive == "Tab4") ? "" : <Row className='align-items-center justify-content-center'>
                                                                            <Col md={1}><Button variant='' onClick={(e) => {

                                                                                if (tab3?.ClosureStatusId == "") {
                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "Closure status is required!"
                                                                                    })
                                                                                }
                                                                                else if (tab3?.ClosureStatusId == "203" && spareList.length == 0) {
                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "Spare  is required!"
                                                                                    })
                                                                                }

                                                                                // else if (tab3?.TypeOfWorkDoneId == '') {
                                                                                //     Swal.fire({
                                                                                //         icon: "error",
                                                                                //         title: "Type of work done is required!"
                                                                                //     })

                                                                                // }

                                                                                else if (tab3?.DetailsOfWorkDone == '') {
                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "Details Of work done is required!"
                                                                                    })

                                                                                }
                                                                                else if (selectPartConsumption === "") {

                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "Select part consumption done or not!"
                                                                                    })
                                                                                }
                                                                                else if (ticketInfo[0]?.divisionCode === 'M7' && selectTech === "") {
                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "Select Engineer / techinician!"
                                                                                    })
                                                                                }

                                                                                else {


                                                                                    const transformedSpares = tab3.SpareList?.map(spare => ({
                                                                                        ...spare,
                                                                                        serialNumbers: spare.serialNumbers.join(',')
                                                                                    }));


                                                                                    let DocumentsArray = tab3?.DocumentWithType?.map(document => document?.file)

                                                                                    // console.log(DocumentsArray);


                                                                                    // console.log(tab3?.warrantyDate);



                                                                                    let n = {
                                                                                        ServiceTicketId: serTicId,
                                                                                        AscServiceTicketFIRId: tab3?.AscServiceTicketFIRId,
                                                                                        ClosureStatusId: tab3?.ClosureStatusId,
                                                                                        DefectList: tab3?.DefectList,
                                                                                        TypeOfWorkDoneId: tab3?.TypeOfWorkDoneId?.map(i => i.value).join(","),
                                                                                        SpareList: transformedSpares,
                                                                                        DetailsOfWorkDone: tab3?.DetailsOfWorkDone,
                                                                                        FailureObservation: tab3?.FailureObservation,
                                                                                        Frame: tab3?.Frame,
                                                                                        Hp: tab3?.Hp,
                                                                                        InvoiceDate: tab3?.InvoiceDate,
                                                                                        InvoiceNo: tab3?.InvoiceNo,

                                                                                        Kva: tab3?.Kva,
                                                                                        SerialNo: tab3?.SerialNo,
                                                                                        ProductCode: tab3?.ProductCode,
                                                                                        DivisionCode: tab3?.DivisionCode,
                                                                                        ProductLineCode: tab3?.ProductLineCode,
                                                                                        ReplacementTagApplied: tab3?.ReplacementTagApplied,
                                                                                        ReplacementTagFile: tab3?.ReplacementTagFile,
                                                                                        warrantyDate: tab3?.warrantyDate,
                                                                                        typeofApplication: tab3?.TypeOfApplication,
                                                                                        NoOfHours: tab3?.NoOfHours,
                                                                                        ManufacturingDate: tab3?.ManufacturingDate,
                                                                                        DateOfDispatch: tab3?.DateOfDispatch,
                                                                                        DateOfCommissioning: tab3?.DateOfCommissioning,
                                                                                        FailureReportedDate: tab3?.FailureReportedDate,
                                                                                        ProductFailureDate: tab3?.ProductFailureDate


                                                                                        // DocumentWithType:DocumentsArray


                                                                                    }


                                                                                    // console.log(n);


                                                                                    // const formData = new FormData();
                                                                                    // Object.keys(n).forEach(key => {
                                                                                    //     if (key == 'DocumentWithType') {
                                                                                    //         formData.append(key, n[key]);
                                                                                    //     } else {
                                                                                    //         formData.append(key, n[key]);
                                                                                    //     }
                                                                                    // });


                                                                                    fetch(`${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/InsertAscServiceTicketFIR`, {
                                                                                        method: "POST",
                                                                                        headers: {
                                                                                            "Content-Type": "application/json",
                                                                                            "Authorization": `Bearer ${token}`
                                                                                        },
                                                                                        body: JSON.stringify(n)
                                                                                    })
                                                                                        .then((res) => {
                                                                                            let resp = res.text();
                                                                                            resp.then((r) => {
                                                                                                // console.log(r);
                                                                                                let regextest = /^[0-9]*$/;
                                                                                                if (r.match(regextest)) {
                                                                                                    claimInformation()
                                                                                                    getSubmittedData()
                                                                                                    fetchdataById()
                                                                                                    // setactiveKeyEdit('3')
                                                                                                    if(RoleName =="AS8"){
                                                                                                        Swal.fire({
                                                                                                            icon: 'success',
                                                                                                            title: 'Submitted successfully!'
                                                                                                        });
                                                                                                        navigate(`${pathName}/service-request`)
                                                                                                    }
                                                                                                    
                                                                        
                                                                                                    // navigate(`${pathName}/service-request`)


                                                                                                    //                                                                                                 let docJson={
                                                                                                    //                                                                                                     AscServiceTicketFIRId:r,
                                                                                                    //                                                                                                     ServiceTicketId:serTicId,
                                                                                                    //                                                                                                     DocumentWithType:DocumentsArray
                                                                                                    //                                                                                                 }


                                                                                                    //    const formData = new FormData();
                                                                                                    //                                                                                 Object.keys(docJson).forEach(key => {
                                                                                                    //                                                                                     if (key == 'DocumentWithType') {
                                                                                                    //                                                                                         formData.append(key, docJson[key]);
                                                                                                    //                                                                                     } else {
                                                                                                    //                                                                                         formData.append(key, docJson[key]);
                                                                                                    //                                                                                     }
                                                                                                    //                                                                                 });

                                                                                                    //                                                                                                 fetch(`${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/InsertAscServiceTicketFIRDocument`, {
                                                                                                    //                                                                                                     method: "POST",
                                                                                                    //                                                                                                     headers: {
                                                                                                    //                                                                                                     //    "Content-Type": "application/json",
                                                                                                    //                                                                                                         "Authorization": `Bearer ${token}`
                                                                                                    //                                                                                                     },
                                                                                                    //                                                                                                     body: formData
                                                                                                    //                                                                                                 }) .then((resDoc) => {
                                                                                                    //                                                                                                     let Jsonresp = resDoc.text();
                                                                                                    //                                                                                                     Jsonresp.then((rDoc) => {
                                                                                                    //                                                                                                         // console.log(rDoc);
                                                                                                    //                                                                                                         let regextestDoc = /^[0-9]*$/;
                                                                                                    //                                                                                                         if (rDoc.match(regextestDoc)) {
                                                                                                    //                                                                                                             claimInformation()
                                                                                                    //                                                                                                             setactiveKeyEdit('3')
                                                                                                    //                                                                                                         }
                                                                                                    //                                                                                                         else{
                                                                                                    //                                                                                                             Swal.fire({
                                                                                                    //                                                                                                                 icon:"error",
                                                                                                    //                                                                                                                 title:"Error uploading Documents!"
                                                                                                    //                                                                                                             })
                                                                                                    //                                                                                                         }
                                                                                                    //                                                                                                     })
                                                                                                    //                                                                                                 })


                                                                                                }
                                                                                                else {
                                                                                                    Swal.fire({
                                                                                                        icon: "error",
                                                                                                        title: "Error Submitting FIR!"
                                                                                                    })
                                                                                                }
                                                                                            })
                                                                                        })


                                                                                    // }

                                                                                    // setactiveKeyEdit('3')
                                                                                }
                                                                            }
                                                                            } className='add-Btn'>Submit</Button></Col>
                                                                        </Row>
                                                                        }




                                                                    </Row>
                                                                )
                                                            }





                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    {RoleName == 'Au5' &&
                                                        <Accordion.Item eventKey="3">
                                                            <Accordion.Header>
                                                                <div className="d-flex w-100 justify-content-between align-items-center m-1 mt-0 mb-0 ms-0">
                                                                    <p className="m-0">
                                                                        {(claim || ticketInfo[0]?.tabActive == "Tab4") ? (
                                                                            <FaCircleCheck
                                                                                color="#58a718"
                                                                                fontSize={20}
                                                                                className="mr-2"
                                                                            />
                                                                        ) : (
                                                                            <strong className="mr-2">4</strong>
                                                                        )}
                                                                        Claim
                                                                    </p>
                                                                    {/* <span>

                                                                    {ticketInfo[0]?.tabActive == "Tab3" ? "" : <span>
                                                                        <Button
                                                                            style={{
                                                                                outline: "none",
                                                                                border: "none",
                                                                            }}
                                                                            variant=""
                                                                        >
                                                                            {" "}
                                                                            <IoArrowUpOutline
                                                                                fontSize={15}
                                                                                color="#fff"
                                                                                onClick={() => {
                                                                                    // setactiveKeyEdit('1')
                                                                                    if (alreadyWorkshoop) {
                                                                                        setactiveKeyEdit("0");
                                                                                    } else {
                                                                                        setactiveKeyEdit("2");
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Button>
                                                                    </span>}
                                                                </span> */}
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body className="pt-0 pb-1">
                                                                <Row>
                                                                    {/* {addActivityIten.length == 0 ? (
                                                                    ""
                                                                ) : ( */}
                                                                    <>
                                                                        {/* {(isDistance60  && !isshowexists) && ( */}


                                                                        {((acknowledgementStatus == "Customer Contacted" && !isshowexists) && isDistance60) && (
                                                                            <Row className="justify-content-center text-center">
                                                                                {(ticketInfo[0]?.divisionCode === 'M7' || ticketInfo[0]?.tabActive === "Tab4") ? "" : (
                                                                                    <>
                                                                                        <Col lg={12} md={6} sm={12}>


                                                                                            <Row className='justify-content-center text-center'>
                                                                                                <p className='m-0'>Change In Distance</p>


                                                                                                {

                                                                                                    <Col lg={12} md={6} sm={12}>
                                                                                                        <Form.Check
                                                                                                            type='radio'
                                                                                                            label="Yes"
                                                                                                            name="radioGroup"
                                                                                                            value="Yes"
                                                                                                            style={{
                                                                                                                color: '#000',
                                                                                                                fontWeight: '400',
                                                                                                                fontSize: '14px',
                                                                                                                textAlign: 'left',
                                                                                                                margin: '5px 15px 0px 0px',
                                                                                                                display: 'inline-block'
                                                                                                            }}
                                                                                                            onChange={(e) => {
                                                                                                                if (e.target.checked) {
                                                                                                                    setrequestforYesDistance(true)
                                                                                                                    setrequestforNoDistance(false)
                                                                                                                    handleDistance()
                                                                                                                    claimInformation()
                                                                                                                    settab4Deviation((pre) => {
                                                                                                                        return {
                                                                                                                            ...pre,
                                                                                                                            ParaDetail: 'Changes in distance',
                                                                                                                            ClaimDeviationTypeId: '3'

                                                                                                                        }


                                                                                                                    })

                                                                                                                }

                                                                                                            }} />
                                                                                                        <Form.Check
                                                                                                            type='radio'
                                                                                                            label="No"
                                                                                                            name="radioGroup"
                                                                                                            value='No'
                                                                                                            onChange={(e) => {
                                                                                                                if (e.target.checked) {
                                                                                                                    setrequestforNoDistance(true)
                                                                                                                    setrequestforYesDistance(false)
                                                                                                                    settab4Deviation((pre) => {
                                                                                                                        return {
                                                                                                                            ...pre,
                                                                                                                            ParaDetail: 'Changes in distance',
                                                                                                                            ClaimDeviationTypeId: '3'

                                                                                                                        }


                                                                                                                    })

                                                                                                                    claimInformation()
                                                                                                                }
                                                                                                            }}
                                                                                                            style={{
                                                                                                                color: '#000',
                                                                                                                fontWeight: '400',
                                                                                                                fontSize: '14px',
                                                                                                                textAlign: 'left',
                                                                                                                margin: '5px 15px 0px 0px',
                                                                                                                display: 'inline-block'

                                                                                                            }} />
                                                                                                    </Col>

                                                                                                }




                                                                                            </Row>

                                                                                            {requestforNoDistance && (


                                                                                                <><Form.Check
                                                                                                    type="radio"
                                                                                                    label="Same day"
                                                                                                    name="radioGroup"
                                                                                                    value="sameday"
                                                                                                    checked={selectedOptionn === 'sameday'}
                                                                                                    onChange={handleRadioChangee}

                                                                                                    style={{
                                                                                                        color: "#000",
                                                                                                        fontWeight: "400",
                                                                                                        fontSize: "12px",
                                                                                                        textAlign: "left",
                                                                                                        margin: "15px 15px 0px 0px",
                                                                                                        display: "inline-block",
                                                                                                    }} /><Form.Check
                                                                                                        type="radio"
                                                                                                        label="Overnight Stay"
                                                                                                        name="radioGroup"
                                                                                                        value="overnight"
                                                                                                        checked={selectedOptionn === 'overnight'}
                                                                                                        onChange={handleRadioChangee}
                                                                                                        style={{
                                                                                                            color: "#000",
                                                                                                            fontWeight: "400",
                                                                                                            fontSize: "12px",
                                                                                                            textAlign: "left",
                                                                                                            margin: "15px 15px 0px 0px",
                                                                                                            display: "inline-block",
                                                                                                        }} /></>
                                                                                            )}









                                                                                            {/* {(isDistance60 && !isshowexists) && (
                                                                                <Form.Check
                                                                                    type="radio"
                                                                                    label="Same day"
                                                                                    name="radioGroup"
                                                                                    value="sameday"
                                                                                    checked={selectedOptionn === 'sameday'}
                                                                                    onChange={handleRadioChangee}

                                                                                    style={{
                                                                                        color: "#000",
                                                                                        fontWeight: "400",
                                                                                        fontSize: "12px",
                                                                                        textAlign: "left",
                                                                                        margin: "15px 15px 0px 0px",
                                                                                        display: "inline-block",
                                                                                    }}

                                                                                />)
                                                                            }
                                                                            {(isDistance120 && !isshowexists) && (
                                                                                <Form.Check
                                                                                    type="radio"
                                                                                    label="Overnight Stay"
                                                                                    name="radioGroup"
                                                                                    value="overnight"
                                                                                    checked={selectedOptionn === 'overnight'}
                                                                                    onChange={handleRadioChangee}
                                                                                    style={{
                                                                                        color: "#000",
                                                                                        fontWeight: "400",
                                                                                        fontSize: "12px",
                                                                                        textAlign: "left",
                                                                                        margin: "15px 15px 0px 0px",
                                                                                        display: "inline-block",
                                                                                    }}
                                                                                />)
                                                                            } */}
                                                                                        </Col>


                                                                                        {(selectedOptionn === 'sameday' && requestforNoDistance) && (
                                                                                            <Row className=' text-start justify-content-center align-items-center mb-2'>
                                                                                                <Col md={4}>
                                                                                                    <Form.Group>
                                                                                                        <Form.Label>Model of Travel <span className="req-t">*</span></Form.Label>
                                                                                                        <Form.Select value={tab4Claim?.modeOftravel} name='modeOftravel' onChange={handleChangetabClaim}>
                                                                                                            <option value=''>Select</option>
                                                                                                            <option value='Bike'>Bike</option>

                                                                                                            {ticketInfo[0]?.divisionCode === 'DR' ? "" : (
                                                                                                                <option value='car'>Car</option>
                                                                                                            )}





                                                                                                        </Form.Select>
                                                                                                    </Form.Group>
                                                                                                </Col>
                                                                                            </Row>


                                                                                        )}
                                                                                        {requestforNoDistance && (<Row>
                                                                                            <Col>
                                                                                                <Button variant='' className='add-Btn'
                                                                                                    onClick={() => {

                                                                                                        // if (tab4Deviation?.ClaimAmount == '') {
                                                                                                        //     Swal.fire({
                                                                                                        //         icon: "error",
                                                                                                        //         title: "Breakfast Amount is required!"
                                                                                                        //     })



                                                                                                        // }
                                                                                                        // else if (tab4Deviation?.Remarks == '') {
                                                                                                        //     Swal.fire({
                                                                                                        //         icon: "error",
                                                                                                        //         title: "Breakfast Description is required!"
                                                                                                        //     })



                                                                                                        // }

                                                                                                        if (tab4Claim?.wayToDistance == '') {
                                                                                                            Swal.fire({
                                                                                                                icon: "error",
                                                                                                                title: "please select same day / overnight stay!"
                                                                                                            })
                                                                                                        }

                                                                                                        else {

                                                                                                            // console.log(tab4Deviation);

                                                                                                            let n = {
                                                                                                                ...tab4Claim,

                                                                                                            }

                                                                                                            const formData = new FormData();
                                                                                                            Object.keys(tab4Claim).forEach(key => {

                                                                                                                if (key == 'AttachmentFile') {
                                                                                                                    formData.append(key, tab4Claim[key]);
                                                                                                                } else {
                                                                                                                    formData.append(key, tab4Claim[key]);
                                                                                                                }
                                                                                                            });

                                                                                                            // console.log(formData);

                                                                                                            fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimInfo/UpsertServiceTicketDeviationClaimInfo`, {
                                                                                                                method: "POST",
                                                                                                                headers: {
                                                                                                                    "Authorization": `Bearer ${token}`
                                                                                                                },
                                                                                                                body: formData

                                                                                                            })
                                                                                                                .then((res) => {
                                                                                                                    let resp = res.text()
                                                                                                                    resp.then((r) => {
                                                                                                                        // console.log(r);
                                                                                                                        let regextest = /^[a-zA-Z0-9]+$/;
                                                                                                                        if (!r.match(regextest)) {
                                                                                                                            const errorData = JSON.parse(r);
                                                                                                                            // console.log('errorData-------------', errorData);
                                                                                                                            if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                                                                                                // Construct error message from the error object
                                                                                                                                let errorMessage = "";
                                                                                                                                for (const key in errorData.errors) {
                                                                                                                                    errorMessage += `${errorData.errors[key][0]}\n`;
                                                                                                                                }
                                                                                                                                Swal.fire({
                                                                                                                                    icon: "error",
                                                                                                                                    title: errorMessage
                                                                                                                                });
                                                                                                                            }
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            Swal.fire({
                                                                                                                                icon: 'success',
                                                                                                                                title: 'Submitted successfully!'
                                                                                                                            });
                                                                                                                            // handleSaveLogstic()
                                                                                                                            setTableClaim(true)
                                                                                                                            setDevationData([])

                                                                                                                            claimInformation()




                                                                                                                        }
                                                                                                                    })


                                                                                                                })
                                                                                                                .catch(error => {
                                                                                                                    console.error('Error:', error);  // Log any errors that occur
                                                                                                                    Swal.fire({
                                                                                                                        icon: 'error',
                                                                                                                        title: 'Something went wrong!',
                                                                                                                        text: 'An unexpected error occurred.'
                                                                                                                    });
                                                                                                                });




                                                                                                        }
                                                                                                    }
                                                                                                    }
                                                                                                >Save</Button>
                                                                                            </Col>
                                                                                        </Row>)}
                                                                                    </>
                                                                                )}



                                                                            </Row>
                                                                        )}





                                                                        {
                                                                            ((ticketInfo[0]?.tabActive == "Tab4" || ticketInfo[0]?.divisionCode == "M7") || !isDistance60 || isshowexists || acknowledgementStatus === 'Product received at workshop') && (

                                                                                <Row>

                                                                                    {!(acknowledgementStatus === 'Product received at workshop' || ticketInfo[0]?.tabActive === "Tab4") && (
                                                                                        <Row>
                                                                                            <Col md={4}>
                                                                                                <Form.Group>
                                                                                                    <Form.Label>Deviation Claim</Form.Label>
                                                                                                    <Form.Select onChange={handleTypeChange} name="ClaimDeviationTypeId" value={tab4Deviation?.ClaimDeviationTypeId}>
                                                                                                        <option>Select</option>
                                                                                                        {devationData?.map((deviation, i) => (
                                                                                                            <option key={i} value={deviation?.parameterTypeId} code={deviation?.parameterType}>
                                                                                                                {deviation?.parameterType}
                                                                                                            </option>
                                                                                                        ))}
                                                                                                    </Form.Select>
                                                                                                </Form.Group>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    )}



                                                                                    <Col md={12} className='mt-3'>

                                                                                        <Table responsive bordered className="mt-1">
                                                                                            <thead className='docTable'>
                                                                                                <tr
                                                                                                    style={{
                                                                                                        fontSize: "12px",
                                                                                                    }}
                                                                                                >
                                                                                                    {/* <th className='m-0 pl-1 py-1 align-content-center'>Service request no</th> */}

                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Type</th>
                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Activity</th>
                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Parameter</th>
                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Rate</th>
                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Quantity</th>

                                                                                                    <th className='m-0 pl-1 py-1 align-content-center'>Claim amount</th>
                                                                                                    {/* <th className='m-0 pl-1 py-1 align-content-center'>Rate</th> */}






                                                                                                    {/* <th></th> */}


                                                                                                </tr>

                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {claimInfo?.map((add, index) => {



                                                                                                    return (
                                                                                                        <>

                                                                                                            <tr className={`${add?.isDeviation == "1" ? 'trcolor' : 'normalColor'}`}

                                                                                                                key={index}
                                                                                                            >
                                                                                                                {/* <td className='m-0 pl-1 py-1 align-content-center'>{add?.TicketNum}</td> */}

                                                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{add?.activityType}</td>

                                                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{add.activityName}</td>
                                                                                                                <td className='m-0 pl-1 py-1 align-content-center'>{add.paraDetail}</td>
                                                                                                                <td className='m-0 pl-1 py-1 align-content-center text-end'>{add?.isValueEditable == "1" ? <Form.Control type='text' style={{ textAlign: "right", border: "2px solid red" }} disabled={ticketInfo[0]?.tabActive == "Tab4"} value={add.paraValue} onChange={(e) => handleParaValueChange(index, e.target.value)} /> : add.paraValue}</td>
                                                                                                                <td className='m-0 pl-1 py-1 align-content-center text-end'>{add.sysDistance}</td>

                                                                                                                <td className='m-0 pl-1 py-1 align-content-center text-end'>
                                                                                                                    {add?.isConveyance === "1"
                                                                                                                        ? ((parseFloat(add.distance) || 0) * (parseFloat(add.paraValue) || 0)).toFixed(2)
                                                                                                                        : parseFloat(add.claimAmount).toFixed(2)}
                                                                                                                </td>


                                                                                                                {/* <td className='m-0 pl-1 py-1 align-content-center text-end'>{add?.isConveyance == "1" ? (parseFloat(add.distance) || 0) * (parseFloat(add.paraValue) || 0) : add?.claimAmount}</td> */}
                                                                                                                {/* <td className='m-0 pl-1 py-1 align-content-center'>
                                                                                            {add?.rateAmount}
                                                                                        </td> */}




                                                                                                            </tr>


                                                                                                        </>

                                                                                                    );
                                                                                                })}
                                                                                                <tr className='totalRowStyle'>
                                                                                                    <td></td>
                                                                                                    <td></td>
                                                                                                    <td className='m-0 p-0'><p className='text-center m-0 p-0' style={{ fontSize: "14px", fontWeight: "500" }}>Total</p></td>
                                                                                                    <td></td>
                                                                                                    <td></td>
                                                                                                    <td className='m-0 p-0 text-end'> <span style={{ fontSize: "14px", fontWeight: "500", textAlign: "end" }}> {totalCalculatedValue.toFixed(2)}</span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </Table>

                                                                                    </Col>
                                                                                    {
                                                                                        tableDataDeviation.length > 0 && (
                                                                                            <Table responsive bordered className="mt-1">
                                                                                                <thead>
                                                                                                    <tr
                                                                                                        style={{
                                                                                                            fontSize: "12px",
                                                                                                        }}
                                                                                                    >
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Service request no</th>
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Type</th>
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Activity</th>
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Parameter</th>
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Possible Value</th>
                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Para Value</th>

                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Rate</th>

                                                                                                        <th className='m-0 pl-1 py-1 align-content-center'>Claim amount</th>








                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {tableDataDeviation.map((item, index) => (
                                                                                                        <tr key={index} style={{
                                                                                                            fontSize: "12px",
                                                                                                        }}>
                                                                                                            <td className='m-0 pl-1 py-1 align-content-center'>{ticketInfo[0]?.serviceTicketNumber}</td>
                                                                                                            <td className='m-0 pl-1 py-1 align-content-center'>{'Field'}</td>
                                                                                                            <td className='m-0 pl-1 py-1 align-content-center'>Logistic Charges</td>
                                                                                                            <td className='m-0 pl-1 py-1 align-content-center'>{item.AttachmentName}</td>
                                                                                                            <td className='m-0 pl-1 py-1 align-content-center'>{'NA'}</td>
                                                                                                            <td className='m-0 pl-1 py-1 align-content-center'>{item.Rate}</td>
                                                                                                            <td className='m-0 pl-1 py-1 align-content-center'><Form.Group>
                                                                                                                <Form.Control type='text' maxLength={4} />
                                                                                                            </Form.Group></td>
                                                                                                        </tr>
                                                                                                    ))}
                                                                                                    <tr style={{
                                                                                                        fontSize: "12px",
                                                                                                    }}>
                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.TicketNum)}</td>
                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.ComplainType)}</td>

                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.parameter)}</td>
                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.possibleValue)}</td>
                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{formData.map((data) => data.rate)}</td>

                                                                                                        <td className='m-0 pl-1 py-1 align-content-center'>{'-'}</td>








                                                                                                    </tr>






                                                                                                </tbody>
                                                                                            </Table>
                                                                                        )
                                                                                    }
                                                                                    {ticketInfo[0]?.tabActive == "Tab4" ? "" : <Row className='justify-content-center align-items-center'>
                                                                                        <Col md={2}><Button variant='' className='add-Btn' onClick={handleSubmitClaim}>Submit</Button></Col>
                                                                                    </Row>}
                                                                                </Row>
                                                                            )
                                                                        }

                                                                    </>
                                                                    {/* )} */}

                                                                </Row>


                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    }





                                                </Accordion>
                                            </div>


                                        </>





                                    </Col>


                                </Row>

                            </Row>










                        </Card >
                    </Col >

                    <GenericModal show={showTechnician} handleClose={handleCloseTechnician} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Re-assign Technician"
                        body={
                            <>

                                <Row>

                                    <Col lg={12} md={12} sm={12}>
                                        <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                            <Row>
                                                <Col lg={12} md={12} sm={12}>
                                                    <Form.Group>
                                                        <Form.Label>Date <span className='req-t'>*</span></Form.Label>
                                                        <Form.Control type='date' value={TechData?.assignDate} min={currentDate} onChange={(e) => {
                                                            setTechData((pre) => {
                                                                return {
                                                                    ...pre,
                                                                    assignDate: e.target.value
                                                                }
                                                            })
                                                        }} />

                                                    </Form.Group>
                                                </Col>

                                                <Col lg={12} md={12} sm={12}>
                                                    <Form.Group>
                                                        <Form.Label>Re-assign Technician<span className='req-t'>*</span></Form.Label>
                                                        <Form.Select
                                                            name='technicianId'
                                                            // value = {TechData.technician}
                                                            onChange={(e) => {
                                                                setTechData((pre) => {
                                                                    return {
                                                                        ...pre,
                                                                        technicianId: e.target.value
                                                                    }
                                                                })
                                                            }}>
                                                            <option value={0}>Select</option>
                                                            {ASCWiseTecnicians.map((obj) => (
                                                                <option key={obj.technicianId} value={obj.technicianId}>
                                                                    {obj.technicianName}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12} md={12} sm={12}>
                                                    <Form.Group>
                                                        <Form.Label>Remarks<span style={{ color: 'red' }}>*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name='remarks'
                                                            // value = {TechData.remarks}
                                                            autocomplete="new-password"
                                                            autoComplete='off'
                                                            //  value={addActivity.activityName}
                                                            onChange={(e) => {
                                                                setTechData((pre) => {
                                                                    return {
                                                                        ...pre,
                                                                        remark: e.target.value
                                                                    }
                                                                })
                                                            }}
                                                            placeholder='Enter Remarks'
                                                        />
                                                    </Form.Group>
                                                </Col>





                                            </Row>



                                        </Card>



                                    </Col>





                                </Row>


                            </>
                        }
                        footer={<>
                            <Button variant="" className='cncl-Btn' onClick={handleCloseTechnician}>
                                Close
                            </Button>
                            <Button variant="" className='add-Btn'
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (TechData.assignDate == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Date is required",
                                        });
                                        return;

                                    }
                                    else if (TechData.technicianId == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Please Select technician",
                                        });
                                        return;

                                    }
                                    else if (TechData.remark == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Remarks is required",
                                        });
                                        return;
                                    }

                                    else {
                                        TechData.technicianId = parseInt(TechData.technicianId)

                                        // console.log(TechData);

                                        fetch(
                                            `${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/UpdateReassignedTechniciane?serviceTicketId=${TechData?.serviceTicketId}&TechnicianId=${TechData?.technicianId}&Remark=${TechData?.remark}&AssignDate=${TechData?.assignDate}`,
                                            {
                                                method: "POST",
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            }
                                        )
                                            // .then((res) => res.json())

                                            .then((res) => {
                                                let resp = res.text()
                                                resp.then((r) => {
                                                    // console.log(r);
                                                    let regextest = /^[a-zA-Z0-9]+$/;
                                                    if (!r.match(regextest)) {
                                                        const errorData = JSON.parse(r);
                                                        // console.log('errorData-------------', errorData);
                                                        if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                            // Construct error message from the error object
                                                            let errorMessage = "";
                                                            for (const key in errorData.errors) {
                                                                errorMessage += `${errorData.errors[key][0]}\n`;
                                                            }
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: errorMessage
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Assign technician successfully!'
                                                        });
                                                        // handleSaveLogstic()

                                                        handleCloseTechnician();




                                                    }
                                                })


                                            })
                                            .catch(error => {
                                                console.error('Error:', error);  // Log any errors that occur
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Something went wrong!',
                                                    text: 'An unexpected error occurred.'
                                                });
                                            });



                                        // .then((result) => {
                                        //     // console.log(result);
                                        //     if (result?.error) {
                                        //         Swal.fire({
                                        //             icon: "error",
                                        //             title: result?.Message,
                                        //         });

                                        //     }

                                        //     else {

                                        //         Swal.fire({
                                        //             icon: 'success',
                                        //             title: 'Assign technician successfully!'
                                        //         });


                                        //         handleCloseTechnician();
                                        //     }



                                        // });












                                    }
                                }
                                }

                            >
                                Save
                            </Button>
                        </>} />

                    <GenericModal show={showMorning} handleClose={handleMorningClose} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Early Morning"
                        body={
                            <>
                                <Row>

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Breakfast Amount <span className="req-t">*</span></Form.Label>
                                            <Form.Control type='text' name='ClaimAmount' disabled value={tab4Deviation?.ClaimAmount} onChange={(e) => {
                                                settab4Deviation((pre) => {
                                                    return {
                                                        ...pre,
                                                        // ClaimAmount: 100,
                                                        // SysDistance: e.target.value

                                                    }
                                                })
                                            }} />


                                        </Form.Group>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label>Breakfast Description <span className="req-t">*</span></Form.Label>
                                            <Form.Control as='textarea' rows={1} disabled name='Remarks' value={tab4Deviation?.Remarks}
                                                onChange={handleChangetab4Deviation}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>


                            </>
                        }
                        footer={<>
                            <Button variant="" className='cncl-Btn'

                                onClick={() => {

                                    if (tab4Deviation?.ClaimAmount == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Breakfast Amount is required!"
                                        })



                                    }
                                    else if (tab4Deviation?.Remarks == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Breakfast Description is required!"
                                        })



                                    }
                                    else {


                                        // console.log(tab4Deviation);

                                        let n = {
                                            ...tab4Deviation,

                                        }

                                        const formData = new FormData();
                                        Object.keys(tab4Deviation).forEach(key => {

                                            if (key == 'AttachmentFile') {
                                                formData.append(key, tab4Deviation[key]);
                                            } else {
                                                formData.append(key, tab4Deviation[key]);
                                            }
                                        });

                                        // console.log(formData);

                                        fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimInfo/UpsertServiceTicketDeviationClaimInfo`, {
                                            method: "POST",
                                            headers: {
                                                "Authorization": `Bearer ${token}`
                                            },
                                            body: formData

                                        })
                                            .then((res) => {
                                                let resp = res.text()
                                                resp.then((r) => {
                                                    // console.log(r);
                                                    let regextest = /^[a-zA-Z0-9]+$/;
                                                    if (!r.match(regextest)) {
                                                        const errorData = JSON.parse(r);
                                                        // console.log('errorData-------------', errorData);
                                                        if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                            // Construct error message from the error object
                                                            let errorMessage = "";
                                                            for (const key in errorData.errors) {
                                                                errorMessage += `${errorData.errors[key][0]}\n`;
                                                            }
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: errorMessage
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Submitted successfully!'
                                                        });
                                                        // handleSaveLogstic()
                                                        setDevationData([])


                                                        handleMorningClose()
                                                        claimInformation()




                                                    }
                                                })


                                            })
                                            .catch(error => {
                                                console.error('Error:', error);  // Log any errors that occur
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Something went wrong!',
                                                    text: 'An unexpected error occurred.'
                                                });
                                            });

                                    }


                                }}

                            >
                                Save
                            </Button>
                            <Button variant="" className='cncl-Btn' onClick={handleMorningClose}>
                                Close
                            </Button>

                        </>} />

                    <GenericModal show={showLogistic} handleClose={handleLogsticClose} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Logistic"
                        body={
                            <>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Logistic charge <span className="req-t">*</span></Form.Label>
                                            <Form.Control type='text' name='ClaimAmount' value={tab4Deviation?.ClaimAmount}
                                                onChange={(e) => {
                                                    settab4Deviation((pre) => {
                                                        return {
                                                            ...pre,
                                                            ClaimAmount: e.target.value,
                                                            SysDistance: e.target.value,
                                                            ParaValue: e.target.value,
                                                            activityTypeId: '164'

                                                        }


                                                    })
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Attachment Name <span className="req-t">*</span></Form.Label>
                                            <Form.Control type='text' name='Remarks' value={tab4Deviation?.Remarks} onChange={handleChangetab4Deviation} />
                                        </Form.Group>
                                    </Col>
                                    {/* <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Attachment type <span className="req-t">*</span></Form.Label>
                                        <Form.Select value={tab4Deviation?.AttachmentType} name='AttachmentType' onChange={handleChangetab4Deviation}>
                                            <option value=''>Select</option>
                                            <option >Logistic Approval</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col> */}
                                </Row>
                                <Row>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Attachment file <span className="req-t">*</span></Form.Label>
                                            <Form.Control type='file' name='AttachmentFile' onChange={handleChangetab4Deviation} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </>
                        }
                        footer={<>
                            <Button variant="" className='cncl-Btn'
                                onClick={() => {

                                    // console.log(tab4Deviation);

                                    if (tab4Deviation?.ClaimAmount == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Logistic charge is required!"
                                        })


                                    }
                                    // else if (tab4Deviation?.AttachmentType == '') {
                                    //     Swal.fire({
                                    //         icon: "error",
                                    //         title: "AttachmentType is required!"
                                    //     })


                                    // }
                                    else if (tab4Deviation?.Remarks == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Attachment Name is required!"
                                        })


                                    }
                                    else if (tab4Deviation?.AttachmentFile == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Attachment File is required!"
                                        })


                                    }


                                    else {



                                        let n = {
                                            ...tab4Deviation,

                                        }

                                        const formData = new FormData();
                                        Object.keys(tab4Deviation).forEach(key => {

                                            if (key == 'AttachmentFile') {
                                                formData.append(key, tab4Deviation[key]);
                                            } else {
                                                formData.append(key, tab4Deviation[key]);
                                            }
                                        });

                                        // console.log(formData);

                                        fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimInfo/UpsertServiceTicketDeviationClaimInfo`, {
                                            method: "POST",
                                            headers: {
                                                "Authorization": `Bearer ${token}`
                                            },
                                            body: formData

                                        })
                                            .then((res) => {
                                                let resp = res.text()
                                                resp.then((r) => {
                                                    // console.log(r);
                                                    let regextest = /^[a-zA-Z0-9]+$/;
                                                    if (!r.match(regextest)) {
                                                        const errorData = JSON.parse(r);
                                                        // console.log('errorData-------------', errorData);
                                                        if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                            // Construct error message from the error object
                                                            let errorMessage = "";
                                                            for (const key in errorData.errors) {
                                                                errorMessage += `${errorData.errors[key][0]}\n`;
                                                            }
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: errorMessage
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Submitted successfully!'
                                                        });
                                                        // handleSaveLogstic()
                                                        handleLogsticClose()
                                                        setDevationData([])

                                                        claimInformation()
                                                        setSelectedOptionradio("")




                                                    }
                                                })


                                            })
                                            .catch(error => {
                                                console.error('Error:', error);  // Log any errors that occur
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Something went wrong!',
                                                    text: 'An unexpected error occurred.'
                                                });
                                            });

                                    }



                                }}

                            >
                                Save
                            </Button>
                            <Button variant="" className='cncl-Btn' onClick={handleLogsticClose}>
                                Close
                            </Button>

                        </>} />
                    <GenericModal show={showIsActive1} handleClose={handleCloseIsActive1} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Print jobsheet"
                        body={
                            <>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Print Empty jobsheet</Form.Label>
                                            <Form.Select
                                                value={empty}
                                                onChange={(e) => {
                                                    setEmpty(e.target.value);


                                                    // settab1((pre) => {
                                                    //     return {
                                                    //         ...pre,
                                                    //         serviceRequestSubStatusId: e.target.value,
                                                    //         productRquestDate: ""
                                                    //     }
                                                    // })
                                                    // if (e.target.value == "28") {
                                                    //     settab1((pre) => {
                                                    //         return {
                                                    //             ...pre,
                                                    //             complainType: "Workshop",

                                                    //         }
                                                    //     })
                                                    // }
                                                    // else if (e.target.value == "30") {
                                                    //     settab1((pre) => {
                                                    //         return {
                                                    //             ...pre,
                                                    //             complainType: "Field",


                                                    //         }
                                                    //     })
                                                    // }




                                                    // fetch(`${process.env.REACT_APP_API_URL}STSubStatus/ServiceTicketStatus?SubStatusid=${e.target.value}`, {
                                                    //     headers: {
                                                    //         Authorization: `Bearer ${token}`,
                                                    //     },
                                                    // })
                                                    //     .then((res) => res.json())
                                                    //     .then((result) => {
                                                    //         // console.log(result);
                                                    //         setsubSubStatus(result)
                                                    //     })






                                                }}
                                            ><option value='no'>No</option>
                                                <option value='yes'>yes</option></Form.Select>



                                        </Form.Group>
                                    </Col>

                                </Row>


                            </>
                        }
                        footer={<>
                            <ReactToPrint
                                trigger={() => <Button variant="" className='cncl-Btn' onClick={() => {
                                    // handleSaveLogstic()
                                    handleCloseIsActive1()
                                }}>
                                    Print
                                </Button>}
                                content={() => componentRef.current}
                            />

                            <Button variant="" className='cncl-Btn' onClick={handleCloseIsActive1}>
                                Close
                            </Button>

                        </>} />

                    <GenericModal show={showDistance} handleClose={handleDistanceClose} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Distance"
                        body={
                            <>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Current Distance(Both side) </Form.Label>
                                            <Form.Control type='text' name='SysDistance' value={tab4Deviation?.SysDistance} onChange={handleChangetab4Deviation} readOnly />

                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Revised Distance(Both side) <span className="req-t">*</span></Form.Label>
                                            <Form.Control type='text'
                                                onChange={handleChangetab4Deviation} name='CurrentDistance' value={tab4Deviation?.CurrentDistance} />

                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Remarks: <span className="req-t">*</span></Form.Label>
                                            <Form.Control as='textarea' rows='2' name='Remarks' value={tab4Deviation?.Remarks} onChange={handleChangetab4Deviation} />

                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="justify-content-center text-center">
                                    <Col lg={12} md={6} sm={12}>
                                        {/* {(isDistanceAbove30 && !isshowexists && isDistanceAbove100) && ( */}

                                        {((ticketInfo[0]?.divisionCode === 'DR' && isDistanceAbove100) ||
                                            (ticketInfo[0]?.divisionCode === 'M7' && isDistanceAbove100) ||
                                            (ticketInfo[0]?.divisionCode === 'M4' && isDistanceAbove30)) && !isshowexists ? (
                                            <Form.Check
                                                type="radio"
                                                label="Same day"
                                                name="radioGroup"
                                                value="sameday"

                                                checked={selectedOptionradio === 'sameday'}
                                                onChange={handleRadioChangeradio}

                                                style={{
                                                    color: "#000",
                                                    fontWeight: "400",
                                                    fontSize: "12px",
                                                    textAlign: "left",
                                                    margin: "15px 15px 0px 0px",
                                                    display: "inline-block",
                                                }}

                                            />) : ""
                                        }
                                        {
                                            ((ticketInfo[0]?.divisionCode === 'DR' && isDistanceAbove100) ||
                                                (ticketInfo[0]?.divisionCode === 'M7' && isDistanceAbove100) ||
                                                (ticketInfo[0]?.divisionCode === 'M4' && isDistanceAbove60)) && !isshowexists ? (
                                                <Form.Check
                                                    type="radio"
                                                    label="Overnight Stay"
                                                    name="radioGroup"
                                                    value="overnight"
                                                    checked={selectedOptionradio === 'overnight'}
                                                    onChange={handleRadioChangeradio}
                                                    style={{
                                                        color: "#000",
                                                        fontWeight: "400",
                                                        fontSize: "12px",
                                                        textAlign: "left",
                                                        margin: "15px 15px 0px 0px",
                                                        display: "inline-block",
                                                    }}
                                                />
                                            ) : null
                                        }


                                    </Col>


                                    {selectedOptionradio === 'sameday' && (
                                        <Row className=' text-start justify-content-center align-items-center mb-2'>
                                            <Col md={4}>
                                                <Form.Group>
                                                    <Form.Label>Model of Travel <span className="req-t">*</span></Form.Label>
                                                    <Form.Select value={tab4Deviation?.modeOftravel} name='modeOftravel' onChange={handleChangetab4Deviation}>
                                                        <option value=''>Select</option>
                                                        <option value='Bike'>Bike</option>
                                                        {ticketInfo[0]?.divisionCode === 'DR' ? "" : (
                                                            <option value='car'>Car</option>
                                                        )}



                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>


                                    )}

                                </Row>







                            </>
                        }
                        footer={<>
                            <Button variant="" disabled={!isDistanceAbove30 || (ticketInfo[0]?.divisionCode === 'DR' && !isDistanceAbove100)} className='cncl-Btn'
                                onClick={() => {
                                    if (tab4Deviation?.CurrentDistance == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Revised Distance is required!"
                                        })
                                    }
                                    else if (tab4Deviation?.Remarks == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Remarks  is required!"
                                        })
                                    }
                                    else if ((isDistanceAbove30 && !isshowexists) && tab4Deviation?.wayToDistance == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "please select same day / overnight stay!"
                                        })
                                    }
                                    else if (isDistanceAbove30 && !isshowexists && tab4Deviation?.wayToDistance == 'sameday' && tab4Deviation?.modeOftravel == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Mode of travel is required!"
                                        })
                                    }
                                    else {


                                        // console.log(tab4Deviation);
                                        let n = {
                                            ...tab4Deviation,

                                        }

                                        const formData = new FormData();
                                        Object.keys(n).forEach(key => {

                                            if (key == 'AttachmentFile') {
                                                formData.append(key, tab4Deviation[key]);
                                            } else {
                                                formData.append(key, tab4Deviation[key]);
                                            }
                                        });


                                        // console.log(formData);

                                        fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimInfo/UpsertServiceTicketDeviationClaimInfo`, {
                                            method: "POST",
                                            headers: {

                                                "Authorization": `Bearer ${token}`
                                            },
                                            body: formData

                                        })
                                            .then((res) => {
                                                let resp = res.text()
                                                resp.then((r) => {
                                                    // console.log(r);
                                                    let regextest = /^[a-zA-Z0-9]+$/;
                                                    if (!r.match(regextest)) {
                                                        const errorData = JSON.parse(r);
                                                        // console.log('errorData-------------', errorData);
                                                        if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                            // Construct error message from the error object
                                                            let errorMessage = "";
                                                            for (const key in errorData.errors) {
                                                                errorMessage += `${errorData.errors[key][0]}\n`;
                                                            }
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: errorMessage
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Submitted successfully!'
                                                        });
                                                        handleDistanceClose()
                                                        setDevationData([])

                                                        claimInformation()
                                                        setSelectedOptionradio("")


                                                    }
                                                })


                                            })
                                            .catch(error => {
                                                console.error('Error:', error);  // Log any errors that occur
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Something went wrong!',
                                                    text: 'An unexpected error occurred.'
                                                });
                                            });
                                    }



                                }}
                            >
                                Save
                            </Button>
                            <Button variant="" className='cncl-Btn' onClick={handleDistanceClose}>
                                Close
                            </Button>

                        </>} />


                    <GenericModal show={showInCaseSpare} handleClose={handleCoseCaseSpare} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Spare carry charges"
                        body={
                            <>
                                <p className='p-0 m-0'>Incase spares weighing more than 25kg’s are to be carried.</p>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Amount </Form.Label>
                                            <Form.Control type='text' name='ClaimAmount' value={tab4Deviation?.ClaimAmount}
                                                onChange={(e) => {
                                                    settab4Deviation((pre) => {
                                                        return {
                                                            ...pre,
                                                            ClaimAmount: e.target.value,

                                                            ParaValue: e.target.value,


                                                        }


                                                    })
                                                }} />

                                        </Form.Group>
                                    </Col>


                                </Row>










                            </>
                        }
                        footer={<>
                            <Button variant="" className='cncl-Btn'
                                onClick={() => {



                                    // console.log(tab4Deviation);

                                    if (tab4Deviation?.ClaimAmount == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Amount is required!"
                                        })


                                    }
                                    else {


                                        let n = {
                                            ...tab4Deviation,

                                        }

                                        const formData = new FormData();
                                        Object.keys(n).forEach(key => {

                                            if (key == 'AttachmentFile') {
                                                formData.append(key, tab4Deviation[key]);
                                            } else {
                                                formData.append(key, tab4Deviation[key]);
                                            }
                                        });


                                        // console.log(formData);

                                        fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimInfo/UpsertServiceTicketDeviationClaimInfo`, {
                                            method: "POST",
                                            headers: {

                                                "Authorization": `Bearer ${token}`
                                            },
                                            body: formData

                                        })
                                            .then((res) => {
                                                let resp = res.text()
                                                resp.then((r) => {
                                                    // console.log(r);
                                                    let regextest = /^[a-zA-Z0-9]+$/;
                                                    if (!r.match(regextest)) {
                                                        const errorData = JSON.parse(r);
                                                        // console.log('errorData-------------', errorData);
                                                        if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                            // Construct error message from the error object
                                                            let errorMessage = "";
                                                            for (const key in errorData.errors) {
                                                                errorMessage += `${errorData.errors[key][0]}\n`;
                                                            }
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: errorMessage
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Submitted successfully!'
                                                        });
                                                        handleCoseCaseSpare()
                                                        claimInformation()



                                                    }
                                                })


                                            })
                                            .catch(error => {
                                                console.error('Error:', error);  // Log any errors that occur
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Something went wrong!',
                                                    text: 'An unexpected error occurred.'
                                                });
                                            });




                                    }
                                }
                                }
                            >
                                Save
                            </Button>
                            <Button variant="" className='cncl-Btn' onClick={handleCoseCaseSpare}>
                                Close
                            </Button>

                        </>} />

                    <GenericModal show={showInCaseSundry} handleClose={handelCloseSundry} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Sundry Charge"
                        body={
                            <>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Sundry Charges</Form.Label>
                                            <Form.Control type='text' name='ClaimAmount' value={tab4Deviation?.ClaimAmount}
                                                onChange={(e) => {
                                                    settab4Deviation((pre) => {
                                                        return {
                                                            ...pre,
                                                            ClaimAmount: e.target.value,

                                                            ParaValue: e.target.value,

                                                        }


                                                    })
                                                }}

                                            />

                                        </Form.Group>
                                    </Col>


                                </Row>










                            </>
                        }
                        footer={<>
                            <Button variant="" className='cncl-Btn'
                                onClick={() => {



                                    // console.log(tab4Deviation);

                                    if (tab4Deviation?.ClaimAmount == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Sundry Charges is required!"
                                        })


                                    }
                                    else {


                                        let n = {
                                            ...tab4Deviation,

                                        }

                                        const formData = new FormData();
                                        Object.keys(n).forEach(key => {

                                            if (key == 'AttachmentFile') {
                                                formData.append(key, tab4Deviation[key]);
                                            } else {
                                                formData.append(key, tab4Deviation[key]);
                                            }
                                        });


                                        // console.log(formData);

                                        fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimInfo/UpsertServiceTicketDeviationClaimInfo`, {
                                            method: "POST",
                                            headers: {

                                                "Authorization": `Bearer ${token}`
                                            },
                                            body: formData

                                        })
                                            .then((res) => {
                                                let resp = res.text()
                                                resp.then((r) => {
                                                    // console.log(r);
                                                    let regextest = /^[a-zA-Z0-9]+$/;
                                                    if (!r.match(regextest)) {
                                                        const errorData = JSON.parse(r);
                                                        // console.log('errorData-------------', errorData);
                                                        if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                            // Construct error message from the error object
                                                            let errorMessage = "";
                                                            for (const key in errorData.errors) {
                                                                errorMessage += `${errorData.errors[key][0]}\n`;
                                                            }
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: errorMessage
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Submitted successfully!'
                                                        });
                                                        handelCloseSundry()
                                                        claimInformation()



                                                    }
                                                })


                                            })
                                            .catch(error => {
                                                console.error('Error:', error);  // Log any errors that occur
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Something went wrong!',
                                                    text: 'An unexpected error occurred.'
                                                });
                                            });




                                    }
                                }
                                }
                            >
                                Save
                            </Button>
                            <Button variant="" className='cncl-Btn' onClick={handelCloseSundry}>
                                Close
                            </Button>

                        </>} />
                    <GenericModal show={showInCaseSpecial} handleClose={handelCloseSpecial} size='l' IsCentered='centered' backdrop="static" className='mdl-title' title="Special Rewinding Charge"
                        body={
                            <>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Special Rewinding Charge</Form.Label>
                                            <Form.Control type='text' name='ClaimAmount' value={tab4Deviation?.ClaimAmount}
                                                onChange={(e) => {
                                                    settab4Deviation((pre) => {
                                                        return {
                                                            ...pre,
                                                            ClaimAmount: e.target.value,

                                                            ParaValue: e.target.value,

                                                        }


                                                    })
                                                }} />

                                        </Form.Group>
                                    </Col>


                                </Row>










                            </>
                        }
                        footer={<>
                            <Button variant="" className='cncl-Btn'
                                onClick={() => {



                                    // console.log(tab4Deviation);

                                    if (tab4Deviation?.ClaimAmount == '') {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Special Rewinding Charge is required!"
                                        })


                                    }
                                    else {


                                        let n = {
                                            ...tab4Deviation,

                                        }

                                        const formData = new FormData();
                                        Object.keys(n).forEach(key => {

                                            if (key == 'AttachmentFile') {
                                                formData.append(key, tab4Deviation[key]);
                                            } else {
                                                formData.append(key, tab4Deviation[key]);
                                            }
                                        });


                                        // console.log(formData);

                                        fetch(`${process.env.REACT_APP_API_URL}ServiceTicketClaimInfo/UpsertServiceTicketDeviationClaimInfo`, {
                                            method: "POST",
                                            headers: {

                                                "Authorization": `Bearer ${token}`
                                            },
                                            body: formData

                                        })
                                            .then((res) => {
                                                let resp = res.text()
                                                resp.then((r) => {
                                                    // console.log(r);
                                                    let regextest = /^[a-zA-Z0-9]+$/;
                                                    if (!r.match(regextest)) {
                                                        const errorData = JSON.parse(r);
                                                        // console.log('errorData-------------', errorData);
                                                        if (errorData && errorData.title === "One or more validation errors occurred.") {
                                                            // Construct error message from the error object
                                                            let errorMessage = "";
                                                            for (const key in errorData.errors) {
                                                                errorMessage += `${errorData.errors[key][0]}\n`;
                                                            }
                                                            Swal.fire({
                                                                icon: "error",
                                                                title: errorMessage
                                                            });
                                                        }
                                                    }
                                                    else {
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Submitted successfully!'
                                                        });
                                                        handelCloseSpecial()
                                                        claimInformation()



                                                    }
                                                })


                                            })
                                            .catch(error => {
                                                console.error('Error:', error);  // Log any errors that occur
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Something went wrong!',
                                                    text: 'An unexpected error occurred.'
                                                });
                                            });




                                    }
                                }
                                }
                            >
                                Save
                            </Button>
                            <Button variant="" className='cncl-Btn' onClick={handelCloseSpecial}>
                                Close
                            </Button>

                        </>} />


                    <GenericModal show={showRequestInfo} handleClose={handleCloseServiceRequest} size='l' backdrop="static" IsCentered='centered' className='mdl-title' title=""
                        body={
                            <>
                                Ticket rejected by you has been moved to ASM.

                            </>
                        }
                        footer={<>
                            <Button variant="" className='cncl-Btn' onClick={handleCloseServiceRequest}>
                                Close
                            </Button>

                        </>} />

                    <GenericModal show={showProductInfo} handleClose={handleCloseProductinfo} size='xl' backdrop="static" IsCentered='centered' className='mdl-title' title="Product Info"
                        body={
                            <>
                                <Card className="p-3">
                                    <Row>
                                        <Col lg={12} md={12} sm={12}>
                                            <Card className='p-2' style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                                                <Row>
                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px" }}>Service request type</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.serviceRequestTypeName}</p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Service request no</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.serviceTicketNumber}</p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Date created</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{moment(ticketInfo[0]?.requestDate?.split(" ")[0]).format('DD-MM-YYYY')}</p>
                                                    </Col>

                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px" }}>Nature of complaint</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.defectDesc}</p>
                                                    </Col>

                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Division</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.divisionName}</p>
                                                    </Col>

                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px", whiteSpace: 'nowrap' }}>Product line</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.productLineName}</p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px" }}>Product Sr no</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.sernr}
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px" }}>Customer/Firm Name</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.customerName}
                                                        </p>
                                                    </Col>





                                                </Row>
                                                <Row>
                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px" }}>Customer Contact No</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.primaryMobileNo}
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px" }}>Location</p>
                                                        <p className='mt-1' style={{ fontWeight: "500", fontSize: "12px" }}>{ticketInfo[0]?.siteAddress}
                                                        </p>
                                                    </Col>

                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px" }}>Warranty status (from batch)</p>
                                                        <Button variant=''
                                                            style={{ fontWeight: "500", fontSize: "12px" }}
                                                            className={`mt-1 ${ticketInfo[0]?.warrantyDateStatus == "In Warranty" ? `WStatus` : ticketInfo[0]?.warrantyDateStatus == "Out Of Warranty" ? "OOWStatus" : ticketInfo[0]?.warrantyDateStatus === "NA" ? "OOWStatus" : ""}`}>
                                                            {ticketInfo[0]?.warrantyDateStatus}
                                                        </Button>

                                                        {/* className={`mt-1 ${ticketInfo[0]?.warrantyDateStatus == "Out Of Warranty" ? `OOWStatus` : `WStatus`}`} style={{ fontWeight: "500", fontSize: "12px" }} >{ticketInfo[0]?.warrantyDateStatus}</Button> */}
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6}>
                                                        <p className='m-0' style={{ fontSize: "12px" }}>Warranty status (from invoice)</p>
                                                        <Button variant='' className={`mt-1 ${ticketInfo[0]?.invoiceDateStatus == "Out Of Warranty" ? `OOWStatus` : `WStatus`}`} style={{ fontWeight: "500", fontSize: "12px" }} >{ticketInfo[0]?.invoiceDateStatus}</Button>
                                                    </Col>





                                                </Row>
                                                {/* <hr /> */}

                                                {/* <div>

                                                <div className='d-flex align-items-center '  >

                                                    <div md={2}>
                                                        <FaUserCircle fontSize={50} />

                                                    </div>
                                                    <div className='ml-2'>
                                                        <p className='m-0 ' style={{ fontSize: "11px" }}>Customer Name</p>
                                                        <p className='m-0 ' style={{ fontWeight: "500", fontSize: "11px" }} >{ticketInfo[0]?.customerName}</p>
                                                    </div>

                                                </div>
                                                <div className='mt-1'>
                                                    <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
                                                    <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}> {ticketInfo[0]?.siteAddress} </p>
                                                </div>
                                                <div className='mt-1'>
                                                    <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>{ticketInfo[0]?.emailId}</span> </p>
                                                    <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
                                                        fontSize={18} /> <span className='ml-2'>{ticketInfo[0]?.primaryMobileNo}</span> </p>


                                                </div>

                                            </div> */}


                                            </Card>



                                        </Col>
                                    </Row>
                                </Card>
                            </>
                        }
                        footer={<>
                            <Button variant="" className='cncl-Btn' onClick={handleCloseProductinfo}>
                                Close
                            </Button>

                        </>} />

                    {/* <GenericModal show={showProductInfo} handleClose={handleCloseProductinfo} size='l' IsCentered='centered' className='mdl-title' title="Product Info"
                    body={
                        <>
                            <Card className="p-3">
                                <Row>
                                    <Col lg={12} md={12} sm={12}>

                                        <Card style={{ backgroundColor: "grey" }} className="p-2 m-0">
                                            <div
                                                style={{ backgroundColor: "white", borderRadius: "8px" }}
                                                className="p-3"
                                            >

                                                <Row>
                                                    <Col lg={3} md={6} sm={6} >
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUI6BtchkEJlwq_ZsPFRvd3J2uUWXPdBWkA&s"
                                                            width={40}
                                                            height={40}
                                                            alt=""
                                                            srcset=""
                                                        />
                                                    </Col>
                                                    <Col lg={4} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Product model
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            Mini-Marshall
                                                        </p>
                                                    </Col>
                                                    <Col lg={4} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Product SN
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            0.55KNE4
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Product type
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            LT Product
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Frame size
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            80
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6} style={{
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Pole
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >

                                                            2P
                                                        </p>
                                                    </Col>
                                                    <Col lg={3} md={6} sm={6} style={{
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Voltage
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            5 Kw
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row>

                                                    <Col lg={4} md={6} sm={6}>
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Date Created
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            12/06/2024
                                                        </p>
                                                    </Col>
                                                    <Col lg={4} md={6} sm={6} >
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Warranty Type
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            W
                                                        </p>
                                                    </Col>
                                                    <Col lg={4} md={6} sm={6} style={{
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                                            Service type
                                                        </p>
                                                        <p
                                                            className="mt-1"
                                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                                        >
                                                            Breakdown
                                                        </p>
                                                    </Col>

                                                </Row>

                                                <Card style={{
                                                    width: 'max-content',
                                                    background: 'white',
                                                    boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)"
                                                }} className="p-2 m-0">
                                                    <Row className='align-items-center'>

                                                        <Col md={2}>
                                                            <FaUserCircle fontSize={50} />

                                                        </Col>
                                                        <Col className='ml-2'>
                                                            <p className='m-0 ' style={{ fontSize: "11px" }}>Customer Name</p>
                                                            <p className='m-0 ' style={{ fontWeight: "500", fontSize: "11px" }} >Rajesh</p>
                                                        </Col>

                                                    </Row>
                                                    <Row className='mt-1'>
                                                        <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}>shivaji Nagar, Near School, Pune -400215 </p>
                                                    </Row>
                                                    <Row className='mt-1'>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>Rajesh@gmail.com</span> </p>
                                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
                                                            fontSize={18} /> <span className='ml-2'>+91 91,0909,8989</span> </p>


                                                    </Row>
                                                </Card>
                                            </div>
                                        </Card>

                                    </Col>
                                </Row>
                            </Card>
                        </>
                    }
                    footer={<>
                        <Button variant="" className='cncl-Btn' onClick={handleCloseProductinfo}>
                            Close
                        </Button>

                    </>} /> */}
                </Row >

                <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                    {
                        empty == "yes" || tab1?.invoiceDate == "" ?
                            <PrintableComponent ref={componentRef} sheet={
                                ticketInfo?.productLineCode == "DC" ? <AlternatorSheetEmpty /> :
                                    ticketInfo?.productLineCode == "4A" ? <FHPEmpty /> :
                                        ticketInfo?.divisionCode == "CP" ? <EmptyJobSheet /> :
                                            ticketInfo?.divisionCode == "M3" && ticketInfo?.productLineCode == "DD" ? <DCJobsheetEmpty /> :
                                                <ACJobSheetEmpty />


                            } /> :
                            <PrintableComponent ref={componentRef} sheet={
                                ticketInfo?.productLineCode == "DC" ? <AlternatorSheet sernNo={ticketInfo?.sernr} prodCode={ticketInfo?.matnr} invDate={moment(tab1?.invoiceDate)?.format("YYYY-MM-DD")} /> :
                                    ticketInfo?.productLineCode == "4A" ? <FHP sernNo={ticketInfo?.sernr} prodCode={ticketInfo?.matnr} invDate={moment(tab1?.invoiceDate)?.format("YYYY-MM-DD")} /> :
                                        ticketInfo?.divisionCode == "CP" ? <JobSheet sernNo={ticketInfo?.sernr} prodCode={ticketInfo?.matnr} invDate={moment(tab1?.invoiceDate)?.format("YYYY-MM-DD")} /> :
                                            ticketInfo?.divisionCode == "M3" && ticketInfo?.productLineCode == "DD" ? <DCJobsheet sernNo={ticketInfo?.sernr} prodCode={ticketInfo?.matnr} invDate={moment(tab1?.invoiceDate)?.format("YYYY-MM-DD")} /> :
                                                <ACJobSheet sernNo={ticketInfo?.sernr} prodCode={ticketInfo?.matnr} invDate={moment(tab1?.invoiceDate)?.format("YYYY-MM-DD")} />


                            } />
                    }

                </div></>}



            <GenericModal title="Delete" IsCentered={true} size="md" show={showDocDel} handleClose={handleCloseDocDel} body={
                <>
                    <p>Do you want to delete this document?</p>
                </>
            } footer={<>
                <Button variant='' className='cncl-Btn' onClick={handleCloseDocDel}>No</Button>
                <Button variant='' className='add-Btn' onClick={(e) => {

                    let docToDelId = localStorage.getItem("documentToDelId");


                    e.preventDefault()


                    fetch(`${process.env.REACT_APP_API_URL}AsmServiceTicketCustomer/DeleteAscServiceTicketFIRDocument?FIRDocumentId=${docToDelId}`, {

                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },

                    })
                        .then(res => res.text())
                        .then(r => {
                            // console.log(r);


                            const regextest = /^[a-zA-Z0-9]+$/;
                            if (r.match(regextest)) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Deleted successfully!"
                                })
                                handleCloseDocDel()
                                localStorage.removeItem("documentToDelId")
                                fetchAllDocuments()
                            }
                            else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Something went wrong!"
                                })
                            }
                        })
                }}>Yes</Button>
            </>} />






            {/* -------------------Delete Activity-------------------------- */}



            <GenericModal title="Delete" IsCentered={true} size="md" show={showActDel} handleClose={handleCloseActDel} body={
                <>
                    <p>Do you want to delete this activity?</p>
                </>
            } footer={<>
                <Button variant='' className='cncl-Btn' onClick={handleCloseActDel}>No</Button>
                <Button variant='' className='add-Btn' onClick={(e) => {

                    let actToDelId = localStorage.getItem("activityToDelId");


                    e.preventDefault()


                    fetch(`${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/DeleteAscServiceTicketActivityAsync?AscActivitiesId=${actToDelId}`, {

                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },

                    })
                        .then(res => res.text())
                        .then(r => {
                            // console.log(r);


                            const regextest = /^[a-zA-Z0-9]+$/;
                            if (r.match(regextest)) {
                                setActivities([])

                                Swal.fire({
                                    icon: "success",
                                    title: "Deleted successfully!"
                                })
                                localStorage.removeItem("activityToDelId")


                                setaddActivityItenTable([])



                                setactivityStatus([])
                                setactivitySubStatus([])
                                setaddActivity((pre) => {
                                    return {
                                        ...pre,
                                        date: "",
                                        typeOfActivity: [],
                                        activeStatusId: 0,
                                        activeSubStatusId: 0
                                    }
                                })


                                handleCloseActDel()

                                getSubmittedData()
                            }
                            else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Something went wrong!"
                                })
                            }
                        })
                }}>Yes</Button>
            </>} />






            {/* -------------------Delete Activity-------------------------- */}

            {/* 

            <GenericModal title="Delete" IsCentered={true} size="md" show={showActDel} handleClose={handleCloseActDel} body={
                <>
                    <p>Do you want to delete this activity?</p>
                </>
            } footer={<>
                <Button variant='' className='cncl-Btn' onClick={handleCloseActDel}>No</Button>
                <Button variant='' className='add-Btn' onClick={(e) => {

                    let actToDelId = localStorage.getItem("activityToDelId");


                    e.preventDefault()


                    fetch(`${process.env.REACT_APP_API_URL}AscServiceTicketCustomer/DeleteAscServiceTicketActivityAsync?AscActivitiesId=${actToDelId}`, {

                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },

                    })
                        .then(res => res.text())
                        .then(r => {
                            // console.log(r);


                            const regextest = /^[a-zA-Z0-9]+$/;
                            if (r.match(regextest)) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Deleted successfully!"
                                })
                                handleCloseActDel()
                                localStorage.removeItem("activityToDelId")
                                getSubmittedData()
                            }
                            else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Something went wrong!"
                                })
                            }
                        })
                }}>Yes</Button>
            </>} /> */}


        </>
    )
}

export default NewAssignRequestIntASM