import Spinner from 'react-bootstrap/Spinner';

function Loader() {
    return (

        <div className=' d-flex align-items-center justify-content-center'>
            <div className='loader'>
                <img src="https://www.cgglobal.com/assets/img/favicon.PNG" alt="CG Global Logo" className="cgloader"></img>

            </div>
        </div>
        // <div className=' d-flex align-items-center justify-content-center'>
        //     <Spinner animation="border" role="status">
        //         <span className="visually-hidden">Loading...</span>
        //     </Spinner>
        // </div>

    )
}

export default Loader