import React, { useState, useEffect } from 'react';
import { Input, CheckboxToggle, Button } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
    StyledLeftPane,
    StyledRightPane,
    StyledPaneContainer,
    StyledRadioGroup,
    HelpLabel,
} from './styled';
import * as firebase from 'firebase';
import { useFirebaseApp, useUser } from 'reactfire';

const PackagingRadioOption = ({ packages }) => {
    const {
        content_description,
        content_value,
        depth,
        height,
        insurance,
        quantity,
        weight,
        width,
        name,
    } = packages;

    return (
        <>
            <span>
                <b>{name}</b>
            </span>
            <p>
                Dimensiones: {height}x{width}x{depth} cm
            </p>
            <p>Peso: {weight} kgs</p>
        </>
    );
};

export const PaqueteComponent = ({ onSave }) => {
    const [value, setValue] = useState(null);

    const [packageData, setPackageData] = useState([]);

    const firebase = useFirebaseApp();
    const db = firebase.firestore();
    const user = useUser();

    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    const [weight, setWeight] = useState('');

    const [contentDescription, setContentDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [contentValue, setContentValue] = useState('');

    const [insurance, setInsurance] = useState(false);
    const [checkBox, setCheckBox] = useState(true);

    const creationDate = new Date();

    useEffect(() => {
        const reloadDirectios = () => {
            db.collection('package')
                .where('ID', '==', user.uid)
                .onSnapshot(handleDirections);
        };
        reloadDirectios();
    }, []);

    function handleDirections(snapshot) {
        const packageData = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        setPackageData(packageData);
    }

    const options = packageData.map((packages, idx) => {
        return {
            value: packages.id,
            label: <PackagingRadioOption key={packages.id} packages={packages} />,
        };
    });

    useEffect(() => {
        if (value) {
            const docRef = db.collection('package').doc(value);
            docRef
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        console.log(doc.data());
                        setName(doc.data().name);
                        setHeight(doc.data().height);
                        setWidth(doc.data().width);
                        setDepth(doc.data().depth);
                        setWeight(doc.data().weight);
                        setContentDescription(doc.data().content_description);
                        setContentValue(doc.data().content_value);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error);
                });
        }
    }, [value]);

    const registerDirecction = () => {
        if (
            name.trim() === '' ||
            height.trim() === '' ||
            width.trim() === '' ||
            depth.trim() === '' ||
            weight.trim() === '' ||
            contentDescription.trim() === '' ||
            quantity.trim() === '' ||
            contentValue.trim() === '' ||
            quantity.trim() === ''
        ) {
            console.log('Espacios vacios');
            return;
        }
        const packageData = {
            ID: user.uid,
            name,
            height: height,
            width: width,
            depth: depth,
            weight: weight,
            content_description: contentDescription,
            quantity: quantity,
            insurance: insurance,
            content_value: contentValue,
            creation_date: creationDate,
        };

        const packageGuiaData = {
            pakage: {
                ID: user.uid,
                name,
                height: height,
                width: width,
                depth: depth,
                weight: weight,
                content_description: contentDescription,
                quantity: quantity,
                insurance: insurance,
                content_value: contentValue,
                creation_date: creationDate,
            },
        };
        onSave(packageData, packageGuiaData, checkBox);
    };

    return (
        <StyledPaneContainer>
            <StyledLeftPane>
                <h4>Mis empaques</h4>
                <StyledRadioGroup
                    id="radio-group-component-1"
                    options={options}
                    value={value}
                    className="rainbow-m-around_small"
                    onChange={e => setValue(e.target.value)}
                />
            </StyledLeftPane>
            <StyledRightPane>
                <h4>Datos de empaque</h4>
                <div className="rainbow-align-content_center rainbow-flex_wrap">
                    <Input
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        value={name}
                        className="rainbow-p-around_medium"
                        style={{ flex: '1 1', minWidth: '200px' }}
                        onChange={e => setName(e.target.value)}
                    />
                    <div style={{ flex: '1 1', minWidth: '300px' }}>
                        <p style={{ textAlign: 'center' }}>Dimensiones</p>
                        <div style={{ display: 'flex' }}>
                            <Input
                                id="height"
                                name="height"
                                value={height}
                                className="rainbow-p-around_medium"
                                style={{ width: '30%' }}
                                onChange={e => setHeight(e.target.value)}
                            />
                            <HelpLabel>x</HelpLabel>
                            <Input
                                id="width"
                                name="width"
                                value={width}
                                className="rainbow-p-around_medium"
                                style={{ width: '30%' }}
                                onChange={e => setWidth(e.target.value)}
                            />
                            <HelpLabel>x</HelpLabel>
                            <Input
                                id="depth"
                                name="depth"
                                value={depth}
                                className="rainbow-p-around_medium"
                                style={{ width: '30%' }}
                                onChange={e => setDepth(e.target.value)}
                            />
                            <HelpLabel>cm</HelpLabel>
                        </div>
                    </div>
                </div>
                <div className="rainbow-align-content_center rainbow-flex_wrap">
                    <Input
                        id="peso"
                        label="Peso"
                        name="peso"
                        value={weight}
                        className="rainbow-p-around_medium"
                        style={{ flex: '1 1' }}
                        onChange={e => setWeight(e.target.value)}
                    />
                    <HelpLabel>kgs</HelpLabel>
                    <Input
                        id="contenido"
                        label="Descripción del Contenido"
                        name="contenido"
                        value={contentDescription}
                        className="rainbow-p-around_medium"
                        style={{ flex: '1 1' }}
                        onChange={e => setContentDescription(e.target.value)}
                    />
                </div>
                <div className="rainbow-align-content_center rainbow-flex_wrap">
                    <Input
                        id="cantidad"
                        label="Cantidad"
                        name="cantidad"
                        value={quantity}
                        className="rainbow-p-around_medium"
                        style={{ flex: '1 1' }}
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <CheckboxToggle
                        id="asegurar"
                        label="¿Desea asegurar?"
                        style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    />
                    <Input
                        id="valor"
                        label="Valor del Contenido"
                        name="valor"
                        value={contentValue}
                        className="rainbow-p-around_medium"
                        style={{ flex: '1 1' }}
                        onChange={e => setContentValue(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'right' }}>
                    <CheckboxToggle
                        id="guardar"
                        label="Guardar"
                        value={checkBox}
                        onChange={e => setCheckBox(e.target.checked)}
                    />
                </div>
                <Button
                    variant="brand"
                    className="rainbow-m-around_medium"
                    onClick={registerDirecction}
                >
                    Continuar
                    <FontAwesomeIcon icon={faArrowRight} className="rainbow-m-left_medium" />
                </Button>
            </StyledRightPane>
        </StyledPaneContainer>
    );
};
