import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, TextInput, Text, Button, View, TouchableOpacity, TouchableNativeFeedback} from 'react-native'
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TasksContext } from '../context/TasksContext';
import {zeroToLeft, formatedDate} from '../utils/functions'
export default function AddTodo(){
    const {edit, submitHandler} = useContext(TasksContext)

    const [text, setText] = useState("")
    const [expanded, setExpanded] = useState(false)
    const [selectedType, setSelectedType] = useState("1")
    const [selectedFrequency, setSelectedFrequency] = useState("1")
    const [displayDay, setDisplayDay] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [dynCurr, setDynCurr] = useState("")
    const [dynMax, setDynMax] = useState("")

    useEffect(()=>{
        if(edit === false){
            setText("")
        }else{
            setText(edit.value)
        }
    }, [edit])

    const changeHandler = (val) => {
        setText(val)
    }

    const changeDisplayDay = (e, d) => {
        setShowDatePicker(false)
        const date = d || displayDay
        setDisplayDay(date)
    }

    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="New todo..."
                    onChangeText={changeHandler}
                    value={text}
                />
                <View style={styles.expandBtnContainer}>
                    <TouchableOpacity style={styles.expandBtn} onPress={()=>setExpanded(!expanded)}><Text>+</Text></TouchableOpacity>
                </View>
            </View>
            

            <CollapsibleView expanded={expanded} title="" noArrow = {true} style={expanded ? styles.noborder : styles.noborderandheight} activeOpacityFeedback={1}>
                <View>
                    <Text style={{fontSize: 10, color: "#333"}}>Frequency:</Text>
                    <Picker
                        selectedValue={selectedFrequency}
                        onValueChange={itemValue => setSelectedFrequency(itemValue)}
                    >
                        <Picker.Item label="Only" value="1" />
                        <Picker.Item label="Daily" value="2" />
                        <Picker.Item label="Weekly" value="3" />
                        <Picker.Item label="Monthly" value="4" />
                        <Picker.Item label="Biweekly" value="5" />
                        <Picker.Item label="Dynamic" value="6" />
                        <Picker.Item label="Weekday" value="7" />
                    </Picker>
                </View>
                {selectedFrequency == "6" && 
                    <View>
                        <View style={styles.splited}>
                            <Text style={{fontSize:10, color: "#333", width:"50%"}}>Current day:</Text>
                            <Text style={{fontSize:10, color: "#333", width: "50%"}}>Max days:</Text>
                        </View>
                        <View style={styles.splited}>
                            <TextInput 
                                style={styles.input, {flex:1, paddingLeft: 10}}
                                placeholder="1"
                                onChangeText={(val) => setDynCurr(val)}
                                value={dynCurr}
                            />
                            <TextInput 
                                style={styles.input, {flex:1, paddingLeft: 10}}
                                placeholder="30"
                                onChangeText={(val) => setDynMax(val)}
                                value={dynMax}
                            />
                        </View>
                    </View>
                    
                }
                <View>
                    <Text style={{fontSize: 10, color: "#333"}}>Type:</Text>
                    <Picker
                        selectedValue={selectedType}
                        onValueChange={itemValue => setSelectedType(itemValue)}
                    >
                        <Picker.Item label="Personal" value="1" />
                        <Picker.Item label="Job" value="2" />
                        <Picker.Item label="College" value="3" />
                        <Picker.Item label="Programmation" value="4" />
                        <Picker.Item label="Challenges" value="5" />
                        <Picker.Item label="Read" value="6" />
                        <Picker.Item label="Languages" value="7" />
                        <Picker.Item label="Courses" value="8" />
                        <Picker.Item label="Others" value="9" />
                    </Picker>
                </View>
                <View>
                    <Text style={{fontSize: 10, color: "#333"}}>Display Day:</Text>
                    <TouchableNativeFeedback onPress={()=> setShowDatePicker(true)}>
                        <Text style={{paddingLeft: 10, marginVertical: 10}}>{formatedDate(displayDay)}</Text>
                    </TouchableNativeFeedback>
                    {
                        showDatePicker &&
                        <DateTimePicker
                            value={displayDay}
                            mode="date"
                            display="default"
                            onChange={changeDisplayDay}
                            minimumDate={new Date()}
                      />
                    }
                </View>
                <Button onPress={()=>submitHandler(text, setText, selectedType, selectedFrequency, formatedDate(displayDay), dynCurr, dynMax)} title={edit === false ? "add todo" : "edit"} color='#2d2d2d'/>
            </CollapsibleView>
        </View>
    )
}

const styles = StyleSheet.create({
    splited: {
        flexDirection: "row",
        marginBottom: 10,
    },
    input: {
        marginLeft: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        flex: 1,
    },
    noborder: {
        borderWidth: 0,
    },
    noborderandheight: {
        height: 0,
        borderWidth: 0,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    expandBtnContainer : {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        width: 32,
        height: 32,
        marginTop: 8,
        backgroundColor: "#2d2d2d"

    },
    expandBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
    }
})