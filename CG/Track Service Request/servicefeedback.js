import React, { useState } from 'react'
import NavBar from '../Navbar'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { IconButton, Rating, styled, Tooltip, Typography } from '@mui/material'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoCallOutline, IoMail, IoSyncOutline } from 'react-icons/io5'
import { CgFileDocument } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaUserCircle } from 'react-icons/fa'
import { CiStar } from 'react-icons/ci'
import Footer from '../footer'
import moment from 'moment'
import Swal from 'sweetalert2'
import { usePathName } from '../../../constants'

const Servicefeedback = () => {
    const navigate = useNavigate();
    const pathName = usePathName();

    const [value, setValue] = useState('');
    const [hoverValue, setHoverValue] = useState(null);
    const TrackTicketDetails = JSON.parse(localStorage.getItem("TrackTicketDetails"));



    const CustomRating = styled(Rating)(({ theme }) => {
        console.log(value, hoverValue);
        return ({
            '& .MuiRating-iconFilled': {
                color:  (value >= 4 ? 'green' : value === 3 ? 'yellow' : 'red'),
            },
            '& .MuiRating-iconHover': {
                color: (hoverValue >= 4 ? 'green' : hoverValue === 3 ? 'yellow' : 'red'),
            },
            '& .MuiRating-iconEmpty': {
                color: theme.palette.action.disabled,
            },
        })
    }
        );
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const setQuestionsMapping = (Ratingvalue)=>{ 
        if(Ratingvalue === 1 || Ratingvalue === 2 || Ratingvalue === 3 || Ratingvalue === 4 || Ratingvalue === 5){
            const getQuestionsUrl = `${process.env.REACT_APP_API_URL}TrackServiceTicket/GetFeedbackQuestions?rating=${Ratingvalue}`;
            fetch(getQuestionsUrl)
            .then(res => res.json())
            .then(result=>{
                let ans = {};
                for(let i=0;i<result.length;i++){
                    let queName = result[i].questionId;
                    let obj={[queName]: ""};
                    ans = {...ans, ...obj};
                }
                setAnswers(ans);
                setQuestions(result);
                setComment("");
                
            
                
            
            })
        }
        else{
            setQuestions([]);
            setComment("");
        }

        
    };

    const questionsChange= (e)=>{
        let name = e.target.name;
        setAnswers((pre)=>{
            return {
                ...pre,
                [name] : e.target.value
            }
        })

    }
    const [comment, setComment] = useState("")
    const handleChange= (e)=>{
        setComment(e.target.value);

    }
    
    const handleSubmit = ()=>{
        console.log(answers);
        for(let i=0;i<questions.length;i++){
            let name = questions[i].questionId;
            if(answers[name].trim() == ""){
                console.log("answers");
                Swal.fire({
                    icon: "error",
                    title: "Please fill all the fields marked with red *!"
                });
                return
            }
        }
        if(comment.trim() == ""){
            Swal.fire({
                icon: "error",
                title: "Please fill all the fields marked with red *!"
            });
            return
        }
        let Quelist = [];
        for(let i=0;i< questions.length;i++){
            let obj = {
                "questionId": questions[i].questionId,
                "answer": answers[questions[i].questionId]
            }
            Quelist.push(obj);

        }
        fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log('External IP: ' + data.ip);
            let inpObj = {
                "serviceTicketNo": TrackTicketDetails?.serviceTicketNumber,
                "rating": value,
                "feedback": comment,
                "questionAnswerList": Quelist,
                "userIPAddress":data.ip
            }
            const getFeedbackUrl = `${process.env.REACT_APP_API_URL}TrackServiceTicket/InsertFeedback`;
    
            fetch(getFeedbackUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inpObj)
            }
            )
                .then((res) => res.json())
                .then((result) => {
                    
                    if(result?.IsSuccess == false){
                        Swal.fire({
                            icon: "error",
                            title: result?.Message
                        })
                    }
                    else{
                        Swal.fire({
                            icon: "success",
                            title: "Feedback Submitted Successfully"
                          });
                        navigate(`${pathName}/track-request`);
                    }
                    
    
                    //handleNextTab();
                })
        })
        .catch(error => console.error('Error:', error));

        



    }
    

    return (
        <>
            <NavBar />

            <Card className="border-0 p-2 mt-0 mx-3"
                style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}>
                <Row className='text-end align-items-center ' >
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <p
                                className="m-0 mdl-title"
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                <CgFileDocument fontSize={14} color="#000" className="mr-2" />
                                {/* View request */}
                                Breakdown/{TrackTicketDetails?.serviceTicketNumber}

                                {/* {pageLabel} */}
                            </p>


                        </div>
                        <div className="d-flex gap-1">

                            <Tooltip arrow placement="left" title="back">
                                <IconButton
                                    className=" m-0 p-0 "
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    <IoIosArrowRoundBack
                                        style={{ cursor: "pointer" }}
                                        fontSize={30}
                                        color="#005bab"
                                    />
                                </IconButton>
                            </Tooltip>

                            <Tooltip arrow placement="left" title="mail">
                                <IconButton className=" m-0 p-0 ">
                                    <IoMail fontSize={20} color="#005bab" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="left" title="refresh">
                                <IconButton className=" m-0 p-0 ">
                                    <IoSyncOutline fontSize={20} color="#005bab" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>




                </Row>
                <hr />


                <Row>
                    <Col lg={4} md={12} sm={12}>
                        <Card
                            style={{ backgroundColor: "grey" }}
                            className="p-2 m-0"
                        >
                            <div
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                }}
                                className="p-3"
                            >
                                <Row className='text-left'>
                                <Col lg={4} md={6} sm={6}>
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Service Request No
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                            {TrackTicketDetails?.serviceTicketNumber}
                                        </p>
                                    </Col>
                                    <Col lg={4} md={6} sm={6}>
                                        <p className="m-0 " style={{ fontSize: "11px" }}>
                                            Date Created
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                           {moment(TrackTicketDetails?.dateCreated?.split(" ")[0]).format("YYYY-MM-DD")}
                                        </p>
                                    </Col>
                                    <Col lg={4} md={6} sm={6}>
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Product model
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                            {TrackTicketDetails?.productLineName}
                                        </p>
                                    </Col>
                                    <Col lg={3} md={6} sm={6}>
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Product serial no
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                            {TrackTicketDetails?.serialNo}

                                        </p>
                                    </Col>
                                    <Col lg={3} md={6} sm={6}>
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Product type
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                            {TrackTicketDetails?.productType}
                                        </p>
                                    </Col>
                                    <Col lg={3} md={6} sm={6}>
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Frame size
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                             {TrackTicketDetails?.frame}
                                        </p>
                                    </Col>
                                    <Col
                                        lg={3}
                                        md={6}
                                        sm={6}
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Pole
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                            {TrackTicketDetails?.pole}
                                        </p>
                                    </Col>
                                    
                                </Row>
                                <Row className='text-left'>
                                <Col
                                        lg={4}
                                        md={6}
                                        sm={6}
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Voltage
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                            {TrackTicketDetails?.voltage}Kw
                                        </p>
                                    </Col>
                                    <Col lg={4} md={6} sm={6}>
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Warranty Status
                                        </p>
                                        <p
                                            className={TrackTicketDetails?.warrantyStatus == "Out Of Warranty"
                                                ?'mt-1 OOWStatus m-0':'mt-1 WStatusFeedback m-0'}
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                            {TrackTicketDetails?.warrantyStatus}

                                        </p>
                                    </Col>
                                    <Col
                                        lg={4}
                                        md={6}
                                        sm={6}
                                        style={{
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <p className="m-0" style={{ fontSize: "11px" }}>
                                            Issue
                                        </p>
                                        <p
                                            className="mt-1"
                                            style={{ fontWeight: "500", fontSize: "11px" }}
                                        >
                                            {TrackTicketDetails?.issueType}

                                        </p>
                                    </Col>
                                </Row>
                                <div>
                                    <div className='mt-1 text-left'>
                                        {/* <p className='m-0 ' style={{ fontSize: "11px" }}>Name</p> */}
                                        <p className='m-0' style={{ fontWeight: "600", fontSize: "14px" }}> {TrackTicketDetails?.ascName} </p>
                                    </div>

                                    {/* <div className='d-flex align-items-center  text-left mt-2'  >

                                        <div md={2}>
                                            <FaUserCircle fontSize={50} />

                                        </div>
                                        <div style={{
                                            marginLeft: '5px'
                                        }}>
                                            <p className='m-0 ' style={{ fontSize: "11px" }}>Name</p>
                                            <p className='m-0  text-left' style={{ fontWeight: "500", fontSize: "11px" }} >Patil</p>
                                        </div>

                                    </div> */}

                                    <div className='mt-1 text-left'>
                                        <p className='m-0' style={{ fontSize: "11px" }}>Location</p>
                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}> {TrackTicketDetails?.ascAddress} </p>
                                    </div>
                                    <div className='mt-2 text-left'>
                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoMail fontSize={18} /> <span className='ml-2'>{TrackTicketDetails?.ascEmailId}</span> </p>
                                        <p className='m-0' style={{ fontWeight: "500", fontSize: "11px" }}><IoCallOutline
                                            fontSize={18} /> <span className='ml-2'>{TrackTicketDetails?.ascMobileNo}</span> </p>


                                    </div>

                                </div>


                            </div>
                        </Card>
                    </Col>
                    <Col lg={8} md={12} sm={12}>
                        <Row className=' justify-content-center align-items-center'>
                            <Typography component="legend">Please rate your experience with CG </Typography>
                            <div>
                                <CustomRating
                                    name="custom-rating"
                                    defaultValue={2}
                                    size="large"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        setQuestionsMapping(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => setHoverValue(newHover)}
                                    icon={<FaStar />}
                                    emptyIcon={<CiStar />}
                                    
                                    // rating={value}
                                />


                            </div>
                        </Row>
                        <Row className='text-left justify-content-center align-items-center'>
                            {questions.map((obj,index)=>{
                                return <Col md={4} key={obj.questionId}>
                                        <Form.Group>
                                            <Form.Label>{obj?.question}<span className="req-t">*</span> </Form.Label>
                                            <Form.Control name={obj.questionId} value={answers[obj?.questionId]} as='textarea' rows='2' 
                                                onChange={questionsChange}/>
                                        </Form.Group>
                                    </Col>
                            })}
                            
                            {(value === 1 || value === 2 || value === 3 || value === 4 || value === 5) && (
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>{(value === 1 ? 'Highly Dissatisfied' : value === 2 ? "Dissatisfied" : value === 3 ? 'Neutral' : value === 4 ? 'Satisfied' : value === 5 ? 'Extremely satisfied' : '')}<span className="req-t">*</span> </Form.Label>
                                        <Form.Control as='textarea' rows='6' onChange={handleChange}  value={comment}/>
                                    </Form.Group>

                                </Col>

                            )}
                            {/* {value === 4 && (
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Satisfied <span className="req-t">*</span>   </Form.Label>
                                        <Form.Control as='textarea' rows='6' />
                                    </Form.Group>

                                </Col>

                            )}
                            {value === 5 && (
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Extremely satisfied <span className="req-t">*</span> </Form.Label>
                                        <Form.Control as='textarea' rows='6' />
                                    </Form.Group>

                                </Col>

                            )} */}
                            {(value === 1 || value === 2 || value === 3 || value === 4 || value === 5) && (
                                <Col md={2}>
                                    <Button variant='' className='add-Btn mt-3' onClick={handleSubmit}>Submit</Button>
                                </Col>
                            )

                            }

                        </Row>

                    </Col>
                </Row>

            </Card>
            <Footer />

        </>
    )
}

export default Servicefeedback