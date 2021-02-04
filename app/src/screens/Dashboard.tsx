import React, { Dispatch, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';

import { setNewTree } from '@/store/actions/dashboard';

interface Props {
    setNewTree: Function,
    dashboardData: []
}

interface Section {
    title: String,
    category: []
}

interface Category {
    title: String,
    element: []
}

interface Element {
    title: String
}

export const Dashboard: React.FC<Props> = ({ setNewTree, dashboardData }) => {

    const [isActiveForm, setActiveForm] = useState(false);

    const [newSection, editSection] = useState<string>('');
    const [newCategory, editCategory] = useState<string>('');
    const [newElement, editElement] = useState<string>('');

    function addNewThree(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setNewTree({
            title: newSection,
            category: [
                {
                    title: newCategory,
                    element: [
                        {
                            title: newElement,
                        }
                    ]
                }
            ]
        });
        editSection('');
        editCategory('');
        editElement('');
    }

    const sections = dashboardData.map((section: Section, sectionId: number) => {
        return (
            <div className="dashboard__section" key={sectionId}>
                <span className="dashboard__section-name">{section.title}</span>
                {section.category.map((category: Category, categoryId: number) => {
                    return (
                        <div className="dashboard__category" key={categoryId}>
                            <span className="dashboard__category-name">{category.title}</span>
                            {category.element.map((element: Element, elementId: number) => {
                                return (
                                    <div className="dashboard__element" key={elementId}>{element.title}</div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    })

    return (
        <section className="dashboard">
            <div className="dashboard__wrapper">
                <div className="dashboard__container container">
                    <nav className="dashboard__nav">
                        <ul className="dashboard__nav-list">
                            <li className="dashboard__nav-item">
                                <button type="button" className="dashboard__nav-btn" onClick={(e: React.FormEvent<HTMLButtonElement>) => setActiveForm(!isActiveForm)}>Добавить новую структуру</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="dashboard__block">
                        <div className={`dashboard__grid ${isActiveForm ? 'dashboard__grid_active' : ''}`}>
                            {sections.length ? sections : (<div className="dashboard__empty">
                                <h2>Пока что элеметов нет!</h2>
                            </div>)}
                        </div>
                        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => addNewThree(e)} className={`dashboard__form ${isActiveForm ? 'dashboard__form_active' : ''}`}>
                            <div className="dashboard__form-block dashboard__form-block_section">
                                <span className="dashboard__form-icon dashboard__form-icon_add">+</span>
                                <label htmlFor="" className="dashboard__label">
                                    <input type="text" value={newSection} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => editSection(e.currentTarget.value)} placeholder="Введите название раздела" />
                                </label>
                            </div>
                            <div className="dashboard__form-block dashboard__form-block_category">
                                <label htmlFor="" className="dashboard__label">
                                    <input type="text" value={newCategory} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => editCategory(e.currentTarget.value)} placeholder="Введите название категории" />
                                </label>
                            </div>
                            <div className="dashboard__form-block dashboard__form-block_element">
                                <label htmlFor="" className="dashboard__label">
                                    <input type="text" value={newElement} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => editElement(e.currentTarget.value)} placeholder="Введите название элемента" />
                                </label>
                            </div>
                            <button type="submit" className="dashboard__form-submit">Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

interface StateProps {
    dashboard: []
}

const mapStateToProps = (state: StateProps) => ({
    dashboardData: state.dashboard
});

const mapDispatchToProps = (dispatch: Function) => ({
    setNewTree(newTreeElement: Object) {
        dispatch(setNewTree(newTreeElement));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
