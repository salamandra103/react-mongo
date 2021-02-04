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

    const [isActiveForm, setActiveForm] = useState(true);

    const [newSection, editSection] = useState<string>('');
    const [newCategory, editCategory] = useState<string>('');
    const [newElement, editElement] = useState<string>('');

    const [tree, editTree] = useState<Array<object>>([
        {
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
        }
    ])

    function addElement(type: String) {
        // editTree(tree.map((item: Object): Object => {

        // }));
        let newTree: Array<Object> = []
        if (type === 'section') {
            newTree = [...tree, {
                title: '',
                category: [
                    {
                        title: '',
                        element: [
                            {
                                title: '',
                            },
                        ]
                    }
                ]
            }]
        } else if (type === 'category') {

        } else if (type === 'element') {

        }
        editTree(newTree);
    }

    function removeElement(type: String) {
        // editTree(tree.map((item: Object): Object => {

        // }));
        let newTree: Array<Object> = [...tree]
        if (type === 'section') {
            newTree.splice(-1, 1);
        } else if (type === 'category') {

        } else if (type === 'element') {

        }
        editTree(newTree);
    }

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
                        },
                    ]
                },
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
    });

    const createTree = tree.map((section: Section, sectionId: number) => {
        return (
            <div className="dashboard__form-container" key={sectionId}>
                <div className="dashboard__form-block dashboard__form-block_section">
                    {sectionId === 0 ? (
                        <div className="dashboard__form-tools">
                            <span className={`dashboard__form-icon dashboard__form-icon_add ${tree.length >= 3 ? 'dashboard__form-icon_disabled' : ''}`} onClick={(e: SyntheticEvent) => addElement('section')}></span>
                            <span className={`dashboard__form-icon dashboard__form-icon_remove ${tree.length <= 1 ? 'dashboard__form-icon_disabled' : ''}`} onClick={(e: SyntheticEvent) => removeElement('section')}></span>
                        </div>
                    ) : null}

                    <label htmlFor="" className="dashboard__label">
                        <input type="text" value={newSection} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => editSection(e.currentTarget.value)} placeholder="Введите название раздела" />
                    </label>
                </div>
                {section.category.map((category: Category, categoryId: number) => {
                    return (
                        <React.Fragment key={categoryId}>
                            <div className="dashboard__form-block dashboard__form-block_category">
                                <label htmlFor="" className="dashboard__label">
                                    <input type="text" value={newCategory} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => editCategory(e.currentTarget.value)} placeholder="Введите название категории" />
                                </label>
                            </div>
                            {category.element.map((element: Element, elementId: number) => {
                                return (
                                    <div className="dashboard__form-block dashboard__form-block_element" key={elementId}>
                                        <label htmlFor="" className="dashboard__label">
                                            <input type="text" value={newElement} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => editElement(e.currentTarget.value)} placeholder="Введите название элемента" />
                                        </label>
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    )
                })}

            </div>
        )
    });

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
                            {createTree.length ? createTree : null}
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
