import React, { useEffect, useState } from "react";
import "./main.css"
import Banner from "../banner/banner";

const MainPage = () => {
    const [post, setpost] = useState([]);
    const [popup, setpopup] = useState(false);
    const [filterdata,setfilter]=useState([]);
    const [CurrentPage,setCurrentPage]=useState(1);
    const [poppost,setpoppost]=useState()
    const recordsPerPage=10;
    const lastindex=CurrentPage * recordsPerPage;
    const firstindex=lastindex - recordsPerPage;
    const records=post.slice(firstindex,lastindex);
    const npage=Math.ceil(post.length / recordsPerPage);
    const numbers=[...Array(npage+1).keys()].slice(1);
    const handleclick = (id) => {
        setpopup(true)
        fetch(`https://api.spacexdata.com/v3/capsules/${id}`).then(res=>res.json())
        .then((data)=>{
            setpoppost(data)
        })
    }
    console.log(poppost);
    const handlecancel = () => {
        setpopup(false);
    }
    useEffect(() => {
        fetch("https://api.spacexdata.com/v3/capsules").then(res => res.json())
            .then((data) => {
                console.log(data);
                setpost(data);
                setfilter(data);
            })
    }, [])
    const handlefilter=(value)=>{
        const res=filterdata.filter(e=>e.type.toLowerCase().includes(value) || e.capsule_serial.toLowerCase().includes(value));
        setpost(res)
    }
    return (
        <div className="container">
            <section>
                <form className="d-flex search" role="search">
                    <input className="form-control me-2 mt-3" type="search" placeholder="Search..." aria-label="Search" onChange={e=>handlefilter(e.target.value)} />
                    {/* <button className="btn btn-outline-success mt-3" type="submit">Search</button> */}
                </form>
            </section>
            <section>
                <div id="product">
                    {
                        records?.map?.((post, index) => {
                            return (
                                <div>
                                    <div key={index} className="card col-1g-4 col-md-4 col-12" onClick={()=>handleclick(post?.capsule_serial)}>
                                        <div className="card-body">
                                            <h5 className="card-title">{post?.capsule_serial}</h5>
                                            <h6 className="card-subtitle mb-2 text-body-secondary">{post?.type}</h6>
                                            <p className="card-text">{post?.details}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section>
                {popup ?<div>
                    <div className="popup">
                                            <div className="popup-header">
                                                <h3 className="card-title">{poppost?.capsule_serial}</h3>
                                                <h1 onClick={handlecancel} className="cancel">X</h1>
                                            </div>
                                            <div>
                                                <div className="card-body">
                                                    <h4>Type:<span><h6 className="card-subtitle mb-2 text-body-secondary">{poppost?.type}</h6></span></h4>
                                                    <h4>Details:<span><h6 className="card-subtitle mb-2 text-body-secondary">{poppost?.details}</h6></span></h4>
                                                    <h4>Landings: <h6 className="card-subtitle mb-2 text-body-secondary">{poppost?.landings}</h6></h4>
                                                    <h4>Original_Launch: <h6 className="card-subtitle mb-2 text-body-secondary">{poppost?.original_launch}</h6></h4>
                                                    <h4>Original_Launch_Unix: <h6 className="card-subtitle mb-2 text-body-secondary">{poppost?.original_launch_unix}</h6></h4>
                                                    <h4>Reuse_Count:<h6 className="card-subtitle mb-2 text-body-secondary">{poppost?.reuse_count}</h6></h4>
                                                    <h4>Status: <h6 className="card-subtitle mb-2 text-body-secondary">{poppost?.status}</h6></h4>
                                                    
                                                </div>
                                            </div>
                                        </div>
                </div>:null}
            </section>
            <nav id="page">
                <ul className="pagination">
                    <li className="page-item">
                    <a href="#" className="page-link" onClick={prepage}>prev</a>
                    </li>
                    {
                        numbers.map((n,i)=>(
                            <li className={`page-item ${CurrentPage === n ?"active":""}`} key={i}>
                                <a href="#" className="page-link" onClick={()=>changeCpage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                    <a href="#" className="page-link" onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
    function prepage(){
        if(CurrentPage !== 1){
            setCurrentPage(CurrentPage - 1)
        }
    }
    function changeCpage(id){
        setCurrentPage(id)
    }
    function nextPage(){
        if(CurrentPage !== npage){
            setCurrentPage(CurrentPage + 1);
        }
    }
}
export default MainPage;