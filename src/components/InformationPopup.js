import React from "react";
import "../App.scss"
import blackLoc from '../images/mapLocationIconBlack.png'

function InformationPopup({position, selectedFridge}) {

    const name = selectedFridge ? selectedFridge.name : "No Fridge Selected"

    return ( <div className={position}>
                <div style="leaflet-control leaflet-bar" style={{border: 'transparent'}}>
                    <img src={blackLoc} style={{height: 60, width: 45, marginLeft: 145, marginBottom: -50}}/>
                    <div className="fridgeInfo">
                        <h1>{name}</h1>
                        {
                            selectedFridge ?
                                <div>
                                    <h2>100 Address Street Line, City ST 31413</h2>
                                    <button style={{float: 'right', color:'white', borderColor: "transparent", backgroundColor: '#89c0b6'}}>Make a Post</button>
                                    <button>Contact Fridge</button>
                                    <p style={{fontWeight: 'bold', paddingTop: '10px'}}>Updates</p>
                                    <p style={{fontSize: '12px'}}>Last Visit: 11/29/21 10:15</p>
                                </div> : <></>
                        }
                    </div>
                </div>
            </div>
    )
}

/*
light to dark mint map colors
#e4f1e1,#b4d9cc,#89c0b6,#63a6a0,#448c8a,#287274,#0d585f
light to dark teal map colors
#d1eeea,#a8dbd9,#85c4c9,#68abb8,#4f90a6,#3b738f,#2a5674
 */

export default InformationPopup