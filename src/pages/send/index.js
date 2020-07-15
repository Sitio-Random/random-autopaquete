import React, { useState, useRef, useEffect } from 'react';
import { ProgressIndicator, ProgressStep } from 'react-rainbow-components';
import { useFirebaseApp, useUser } from 'reactfire';
import { useParams } from 'react-router-dom';

import { OrigenComponent } from './origen';
import { DestinoComponent } from './destino';
import { PaqueteComponent } from './paquete';
import { ServicioComponent } from './servicio';
import { DescargaComponent } from './descarga';
import { StyledSendPage } from './styled';

const SendPage = () => {
    const [currentStepName, setCurrentStepName] = useState('paquete');
    const firebase = useFirebaseApp();
    const db = firebase.firestore();
    const idGuiaGlobal = useRef(null);
    const user = useUser();
    const { idGuia: idGuiaParam, step: stepParam } = useParams();

    useEffect(() => {
        if (stepParam) setCurrentStepName(stepParam);
    }, [stepParam]);

    useEffect(() => {
        if (idGuiaParam) idGuiaGlobal.current = idGuiaParam;
    }, [idGuiaParam]);

    const saveOriginData = ({ idGuia }) => {
        // TODO: Guardar la info de la dirección a firestore (si fue solicitado)
        idGuiaGlobal.current = idGuia;
        // TODO: Guardar la dirección en un State, para usarla cuando se creará la guía
        setCurrentStepName('destino');
    };

    const saveDestinationData = (
        directionData,
        directionGuiaData,
        checkBox,
        duplicateName,
        name,
    ) => {
        // TODO: Guardar la info de la dirección a firestore (si fue solicitado)
        if (checkBox) {
            if (duplicateName.includes(name)) {
                console.log('Necesitas poner un nombre diferente');
                return;
            }
            db.collection('receiver_addresses')
                .add(directionData)
                .then(function(docRef) {
                    console.log('Document written with ID (destino): ', docRef.id);
                })
                .catch(function(error) {
                    console.error('Error adding document: ', error);
                });
        }
        // TODO: Guardar la dirección en un State, para usarla cuando se creará la guía
        const directionsGuiasCollectionAdd = db
            .collection('guia')
            .doc(idGuiaGlobal.current)
            .update(directionGuiaData);

        directionsGuiasCollectionAdd
            .then(function(docRef) {
                console.log('Se cumplio! Document written with ID (guia): ', docRef.id);
            })
            .catch(function(error) {
                console.error('Error adding document: ', error);
            });
        setCurrentStepName('paquete');
    };

    const savePackagingData = (packageData, packageGuiaData, checkBox, duplicateName, name) => {
        // TODO: Guardar la info del paquete a firestore (si fue solicitado)
        if (checkBox) {
            if (duplicateName.includes(name)) {
                console.log('Necesitas poner un nombre diferente');
                return;
            }
            db.collection('package')
                .add(packageData)
                .then(function(docRef) {
                    console.log('Document written with ID (destino): ', docRef.id);
                })
                .catch(function(error) {
                    console.error('Error adding document: ', error);
                });
        }
        // TODO: Guardar la info del paquete en un State, para usarla cuando se creará la guía
        const directionsGuiasCollectionAdd = db
            .collection('guia')
            .doc(idGuiaGlobal.current)
            .update(packageGuiaData);

        directionsGuiasCollectionAdd
            .then(function(docRef) {
                console.log('Se cumplio! Document written with ID (guia): ', docRef.id);
            })
            .catch(function(error) {
                console.error('Error adding document: ', error);
            });
        setCurrentStepName('servicio');
    };

    const saveServiceData = supplierData => {
        // TODO: Guardar la elección de paquetería en un State, para usarla cuando se creará la guía

        const directionsGuiasCollectionAdd = db
            .collection('guia')
            .doc(idGuiaGlobal.current)
            .update({ status: 'completed', supplierData });

        let servicioUrl;
        if (supplierData.Supplier.indexOf('estafeta') >= 0) {
            servicioUrl = '/guia/estafeta';
        } else {
            servicioUrl = '/guia/fedex';
        }

        directionsGuiasCollectionAdd
            .then(function() {
                user.getIdToken().then(idToken => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'json';
                    xhr.contentType = 'application/json';
                    xhr.open('POST', servicioUrl);
                    xhr.setRequestHeader('Authorization', `Bearer ${idToken}`);
                    xhr.send(JSON.stringify({ guiaId: idGuiaGlobal.current }));
                    setCurrentStepName('descarga');
                });
            })
            .catch(function(error) {
                console.error('Error adding document: ', error);
            });
    };

    return (
        <>
            <StyledSendPage>
                <ProgressIndicator currentStepName={currentStepName}>
                    <ProgressStep name="origen" label="Origen" />
                    <ProgressStep name="destino" label="Destino" />
                    <ProgressStep name="paquete" label="Paquete" />
                    <ProgressStep name="servicio" label="Servicio" />
                    <ProgressStep name="descarga" label="Descarga" />
                </ProgressIndicator>
                {currentStepName === 'origen' && <OrigenComponent onSave={saveOriginData} />}
                {currentStepName === 'destino' && <DestinoComponent onSave={saveDestinationData} />}
                {currentStepName === 'paquete' && <PaqueteComponent onSave={savePackagingData} />}
                {currentStepName === 'servicio' && (
                    <ServicioComponent
                        onSave={saveServiceData}
                        idGuiaGlobal={idGuiaGlobal.current}
                    />
                )}
                {currentStepName === 'descarga' && (
                    <DescargaComponent idGuiaGlobal={idGuiaGlobal.current} />
                )}
            </StyledSendPage>
        </>
    );
};

export default SendPage;
