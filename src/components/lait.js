import React, { useState, useEffect }  from "react";
import "../App.css";
import Axios from "axios";


function Lait (props){
 
  const [isLoading, setLoading] = useState(true);
  var [prod, setProd] = useState([]);
  const [outmesg, setOutmesg] = useState("");
  var [zid, setZid] = useState([]);
  var [zdist, setZdist] = useState([]);
  var [zu, setZu] = useState([]);
  var [zret, setZret] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const lot = queryParams.get("lot");

  


  useEffect(() => {

    Axios.post("http://192.168.1.16:3005/showforqr", {
               pid: id,
               lotNumber:lot,
                        
            }).then(res=>{
           // handle success
           prod[0]= res.data[0].product_name;
           prod[1]= res.data[0].n_lot;
           prod[2]= res.data[0].production_date;
           prod[3]= res.data[0].expiration_date;
           prod[4]= res.data[0].distribution_date;
           prod[5]= res.data[0].retdate;
           prod[6]= res.data[0].quality_farmer;
           prod[7]= res.data[0].usine_date;
           prod[10]= res.data[0].transactionhash;
                      
           setProd(prod);
            console.log(prod); 
             return;        
             })
            .catch(function (error) {
             setOutmesg("Error ");
              return;
            }); 


 Axios.post("http://192.168.1.16:3005/showforqr2", {

               pid: id,
               lotNumber:lot,
               
            }).then(res=>{
           // handle success
           console.log("fil rs");
         for (var i=0; i<'4'; i++)
         { 
            if (res.data[i].role === 'Farmer')
            {console.log("fil farmer");
              zid[0]= res.data[i].username;
              zid[1]= res.data[i].Location;
              zid[2]= res.data[i].description;
              zid[3]= res.data[i].URL;
              zid[4]= res.data[i].pays;
              

            }
                 
           if (res.data[i].role === 'Distributor')
          {         
           zdist[0]= res.data[i].username;
           zdist[1]= res.data[i].URL;
           zdist[2]= res.data[i].description;
           zdist[3]= res.data[i].certifications;
           
           }
          if (res.data[i].role === 'Usine')
          {         
           zu[0]= res.data[i].username;
           zu[1]= res.data[i].URL;
           zu[2]= res.data[i].description;
           zu[3]= res.data[i].certifications;
           zu[5]= res.data[i].Location;
           }
           if (res.data[i].role === 'Retailer')
          {   
           zret[0]= res.data[i].username;
           zret[1]= res.data[i].URL;
           zret[2]= res.data[i].Location;
           zret[3]= res.data[i].description;
           zret[4]= res.data[i].certifications;
           
           }

           }
           
           setZid(zid);
           setZdist(zdist);
           setZu(zu);
           setZret(zret);
           setLoading(false);
           console.log(zid);
            return;        
            })
            .catch(function (error) {
              setOutmesg("Error database uers ");
              return;
            });  
            
 }, []); //end of useeffect

if (isLoading) {
    return <div class="App"><img src={"assets/img/Loading_icon.gif"} alt="..." /></div>;
  }
   //chargement image du background en haut
   const background = require("../bg/"+id+".jpg");
    //chargement image du background en hautcertificat
    const Pdf = require ("../certif/"+id+".pdf");
   return (
    
      <div className="App">
      
        <body id="page-top">
            
        <header class="masthead" style={{ backgroundImage: `url(${background})` }}>
            <div class="container">
                <div class="masthead-subheading"></div>
                <div class="masthead-heading text-uppercase"></div>
                <a class="btn btn-primary btn-xl text-uppercase" href="#about">En Savoir Plus</a>
            </div>
        </header>
        
        
        
        <section class="page-section" id="about">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase"> {prod[0]}</h2>
                    <h3> </h3>
                    <h3 class="section-subheading text-muted"> <i class="fa-solid fa-flag"></i> Origine: {zid[4]} <p> A consommer avant:  {prod[3]}</p></h3>
                </div>
                
                <ul class="timeline">
                    <li>
                    
                        <div class="timeline-image"><img class="rounded-circle img-fluid" src={"assets/img/about/"+id+"1.jpg"} alt="..." /></div>
                        <div class="timeline-panel">
                            <div class="timeline-heading">
                                <h4 class="subheading">Ferme: {zid[0]}</h4>
                                <h7>DF: {prod[2]}</h7>
                            </div>
                            <div class="timeline-body"><p class="text-muted"> En savoir plus  </p>
                            <a data-bs-toggle="modal" href="#portfolioModal1"><i class="fas fa-plus fa-3x"></i></a></div>
                        
                            </div>
                    </li>
                    <li class="timeline-inverted">
                        <div class="timeline-image"><img class="rounded-circle img-fluid" src={"assets/img/about/"+id+"2.jpg"} alt="..." /></div>
                        <div class="timeline-panel">
                            <div class="timeline-heading">
                                <h4 class="subheading">Centre de collecte: {zdist[0]}</h4>
                                <h7>{prod[4]}</h7>
                            </div>
                            <div class="timeline-body"><p class="text-muted">En savoir plus </p>
                            <a data-bs-toggle="modal" href="#portfolioModal2"><i class="fas fa-plus fa-3x"></i></a></div>
                        </div>
                    </li>
                    <li>
                        <div class="timeline-image"><img class="rounded-circle img-fluid" src={"assets/img/about/"+id+"3.jpg"} alt="..." /></div>
                        <div class="timeline-panel">
                            <div class="timeline-heading">
                                <h4 class="subheading">Usine: {zu[0]}</h4>
                                <h7>{prod[7]}</h7>
                            </div>
                            <div class="timeline-body"><p class="text-muted"><br/>En savoir plus</p>
                            <a data-bs-toggle="modal" href="#portfolioModal3"><i class="fas fa-plus fa-3x"></i></a></div>
                         </div>
                    </li>
                    <li class="timeline-inverted">
                        <div class="timeline-image"><img class="rounded-circle img-fluid" src={"assets/img/about/"+id+"4.jpg"} alt="..." /></div>
                        <div class="timeline-panel">
                            <div class="timeline-heading">
                                <h4 class="subheading">Magasin: {zret[0]} </h4>
                                <h7>{prod[5]}</h7>
                            </div>
                            <div class="timeline-body"><p class="text-muted">En savoir plus</p>
                             <a data-bs-toggle="modal" href="#portfolioModal4"><i class="fas fa-plus fa-3x"></i></a></div>
                         </div>
                    </li>
                    <li class="timeline-inverted">
                        <div class="timeline-image">
                            <h4>
                                Be Part
                                <br />
                                Of Our
                                <br />
                                Story!
                            </h4>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        
        
        <section class="page-section" id="contact">
            <div class="container">
                <div class="text-center">
                    <h5 class="section-heading text-uppercase"><a href={"https://ropsten.etherscan.io/tx/"+ prod[10]}>Powered by Blockchain technology </a></h5>
                    
                </div>
            </div>
        </section>
        
        <footer class="footer py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 text-lg-start">Copyright Cyclone IT @ 2022</div>
                 
                </div>
            </div>
        </footer>
        
        <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    
                                    <h2 class="text-uppercase">{zid[0]}</h2>
                                    <p class="item-intro text-muted">{zid[1]}  <i class="fa fa-map-marker" aria-hidden="true"></i><a href={zid[3]}>google maps</a></p>
                                    <img class="img-fluid d-block mx-auto" src={"assets/img/portfolio/"+id+"1.jpg"} alt="..." />
                                    <p>{zid[2]}</p>
                                    <div style={{ display: "flex", justifyContent: "center",  alignitems: "center"}}>
                                            <iframe
                                             src="https://www.youtube.com/embed/zXDJzWaJ3tM"
                                             frameBorder="0" 
                                             allowFullScreen=""
        
                                             />{" "}
                                     </div>
                                     <br/>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Site web: </strong>
                                             {zid[3]}
                                        </li>
                                        <br/>
                                        <li>
                                            <strong>Awards: </strong>
                                            {prod[6]}
                                            <object data={Pdf} type="application/pdf" width="100%" height="100%"><a href = {Pdf} target = "_blank">Download BIO certificat</a></object>
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-xmark me-1"></i>
                                        Close 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    
                                    <h2 class="text-uppercase">{zdist[0]}</h2>
                                    <p class="item-intro text-muted">Location: Bizerte <i class="fa fa-map-marker" aria-hidden="true"></i><a href="https://www.google.com/maps/place/Bizerta+Agri+Industry+-+Oilyssa/@37.202438,9.9407877,17z/data=!3m1!4b1!4m5!3m4!1s0x12e2dfcbbb6c840f:0x4022d04013663744!8m2!3d37.2023901!4d9.9430282">google maps</a> </p>
                                    <img class="img-fluid d-block mx-auto" src={"assets/img/portfolio/"+id+"2.jpg"} alt="..." />
                                    <p> {zdist[2]}</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Site web: </strong>
                                           {zdist[1]}
                                        </li>
                                        <li>
                                            <strong>Certifications: </strong>
                                           {zdist[3]}
                                            
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-xmark me-1"></i>
                                        Close 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
          <div class="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    
                                    <h2 class="text-uppercase">{zu[0]}</h2>
                                    <p class="item-intro text-muted">Location: {zu[5]} <i class="fa fa-map-marker" aria-hidden="true"></i> </p>
                                    <img class="img-fluid d-block mx-auto" src={"assets/img/portfolio/"+id+"3.jpg"} alt="..." />
                                    <p> {zu[2]}</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Site web: </strong>
                                           {zu[1]}
                                        </li>
                                        <li>
                                            <strong>Certifications: </strong>
                                           {zu[3]}
                                            
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-xmark me-1"></i>
                                        Close 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <div class="portfolio-modal modal fade" id="portfolioModal4" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                   
                                    <h2 class="text-uppercase">{zret[0]}</h2>
                                    <p class="item-intro text-muted">{zret[2]}</p>
                                    <img class="img-fluid d-block mx-auto" src={"assets/img/portfolio/"+id+"4.jpg"} alt="..." />
                                    <p> {zret[3]}</p>
                                    <ul class="list-inline">
                                        <li>
                                            <strong>Site web: </strong>
                                            {zret[1]}
                                        </li>
                                        <li>
                                            <strong>Certifications: </strong>
                                            {zret[4]}
                                            
                                        </li>
                                    </ul>
                                    <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                        <i class="fas fa-xmark me-1"></i>
                                        Close 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        
    </body>
     
      </div>
     
    );
  
}

export default Lait;
