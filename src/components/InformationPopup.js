import React from "react";
import "../App.scss"
import blackLoc from '../images/mapLocationIconBlack.png'
import fridges from "../data/fridges.json"
import PopupConstrols from "./PopupConstrols";

function InformationPopup({position, selectedFridge, updateSelected}) {

    const name = selectedFridge ? selectedFridge.name : "No Fridge Selected"

    return ( <div className={position}>
                <div style="leaflet-control leaflet-bar" style={{border: 'transparent'}}>
                    <img src={blackLoc} style={{height: 60, width: 40, marginLeft: 145, marginBottom: -50}} alt={"location symbol"}/>
                    <div className="fridgeInfo">
                        <h1>{name}</h1>
                        {
                            selectedFridge ?
                                <div>
                                    <h2>100 Address Street Line, City ST 31413</h2>
                                    <PopupConstrols text='Contact Fridge'/>
                                    <PopupConstrols text='Make a Post' style={{
                                        float: 'right',
                                        color: 'black',
                                        backgroundColor: '#89c0b6',
                                        borderColor: 'transparent'
                                    }}/>
                                    <p style={{marginTop: '20px'}}>Updates</p>
                                    <p style={{fontSize: '12px'}}>Last Visit: 11/29/21 10:15</p>
                                </div> :
                                <div className={"scroll_pane"}>
                                    {fridges.map(fridge => (
                                        <PopupConstrols
                                            text={fridge.name + ": " + fridge.address}
                                            style={{
                                                width: 'fit-content',
                                                height: 'fit-content'
                                            }}
                                            click_on={updateSelected(fridge)}
                                            click_off={updateSelected(null)}
                                        />
                                    ))}
                                </div>
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