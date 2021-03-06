import styled from 'styled-components';
import { RadioGroup } from 'react-rainbow-components';

export const StyledSendPage = styled.div`
    flex: 1 1;
    padding: 3rem;

    background-color: #f7f7f7;
    min-height: 100vh;

    .link-package {
        p {
            text-decoration: underline;
            text-align: center;
        }

    @media (max-width: 768px) {
        padding: 3rem 0;
    }
`;

export const StyledDirectiosDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 3rem 20rem 3rem 0;
    justify-content: space-between;
    @media (max-width: 1536px) {
        margin: 3rem auto;
    }
`;

export const StyledError = styled.div`
    color: crimson;
    margin-left: 14rem;
    margin-bottom: -2rem;
`;

export const StyledDetails = styled.div`
    flex-basis: 22%
    margin-right: 10px;
    @media (max-width: 1024px) {
        flex-basis: 100%
        text-align: center;
        margin: 1rem 0;
            }
`;

export const StyledPaneContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .save-button {
        border-color: transparent;
        background-color: #00183d;
        color: white;
    }

    .content-value {
        justify-content: left !important;
    }

    .empty-space div > input {
        border: 1.5px solid #ab0000 !important;
    }

    @media (max-width: 768px) {
        margin: 3rem auto;
    }
`;

const StyledPane = styled.div.attrs(props => {
    return props.theme.rainbow.palette;
})`
    background: ${props => props.background.main};
    color: ${props => props.text.label};
    padding: 2rem;
    border-radius: 0.875rem;
    color: crimson;
    box-shadow: 0px 0px 16px -4px rgba(0, 0, 0, 0.75);
    margin: 1rem;
    display: flex;
    flex-wrap: wrap;
    min-height: 30vh;
    min-width: 330px;
    justify-content: flex-start;
    flex-direction: column;
    overflow-y: scroll;

    h4 {
        text-align: center;
    }
`;

export const StyledLeftPane = styled(StyledPane)`
    flex: 1 1;
`;

export const StyledRightPane = styled(StyledPane)`
    flex: 3 3;

    .alert-push {
        font-size: 5px !important;
        font-weight: 600;
        color: #0e0e0e !important;
    }
    .link-package {
        p {
            font-size: 12px;
            text-decoration: underline;
            color: rgba(171, 0, 0, 1);
            text-align: center;
        }
    }
`;

export const StyledRadioGroup = styled(RadioGroup)`
    max-height: 465px;

    & label span {
        display: inline-flex;
        flex-direction: column;
        justify-content: unset;
        vertical-align: unset;
        font-size: 0.8rem;
    }
    & > div > div {
        padding: 0.75rem 0;
        width: 95%;
    }
    & > div > div:not(:last-child) {
        border-bottom: 1px solid gainsboro;
    }
`;

export const HelpLabel = styled.span`
    margin-top: 25px;
    color: gray;
`;

export const DownloadContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5rem auto;
    text-align: center;
    width: 300px;
`;

export const DownloadContainerPDF = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    margin: 5rem auto;
`;
