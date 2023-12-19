import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import { RoundedButton } from './RoundedButton';

interface Props {
    remove: () => void,
    cancel: () => void,
    textDelete: string,
    modalUseState: boolean,
    setModalUseState: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalConfirmDelete = ({ remove, setModalUseState, cancel, modalUseState, textDelete }:Props) => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalUseState}
          onRequestClose={() => {
            setModalUseState(!modalUseState);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text>¿Estas seguro de que quieres eliminar</Text>
                <Text style={styles.textDelete}>"{textDelete}"?</Text>
                <View style={styles.buttonContainer}>
                    <RoundedButton
                        onPress={() => {
                            remove()
                            setModalUseState(false)
                        }}
                        text='Eliminar'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <RoundedButton
                        onPress={() => {
                            cancel()
                            setModalUseState(false)
                        }}
                        text='Cancelar'
                    />
                </View>

            </View>
          </View>
        </Modal>
      </View>
    );
}
  
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 300,
        height: 210,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 25,
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textDelete:{
        marginTop: 2,
        fontSize: 15,
        fontWeight: 'bold' 
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 8
    }
});
