import React, { Dispatch, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';

import { setNewTree } from '@/store/actions/dashboard';

interface Props {
    setNewTree: Function,
    dashboardData: Array<Tree>
}

interface Section {
    title: string,
    categories: []
}

interface Category {
    title: string,
    elements: Array<Element>
}

interface Element {
    title: string
}

interface Tree {
    title: string,
    categories: Array<Category>
}

interface StateProps {
    dashboard: Array<Tree>,
}

export const Dashboard: React.FC<Props> = ({ setNewTree, dashboardData }) => {

    const [isActiveForm, setActiveForm] = useState(true);

    const [tree, editTree] = useState<Array<Tree>>([
        {
            title: '',
            categories: [
                {
                    title: '',
                    elements: [
                        {
                            title: '',
                        }
                    ]
                }
            ]
        }
    ])



    function changeElementValue(type: string, value: string, sectionId?: number, categoryId?: number, elementId?: number): void {
        let newTree: Array<Tree> = [...tree];

        if (type === 'section') {
            try {
                if (typeof sectionId === 'undefined') {
                    throw new Error('Отсутствует обязательный параметр sectionId')
                }
                newTree = newTree.map((item, id) => {
                    if (id === sectionId) {
                        return {
                            ...item,
                            title: value
                        }
                    }
                    return item;
                });
            } catch (err) {
                console.error(err);
            }
        } else if (type === 'category') {
            try {
                if (typeof sectionId === 'undefined') {
                    throw new Error('Отсутствует обязательный параметр sectionId')
                }
                if (typeof categoryId === 'undefined') {
                    throw new Error('Отсутствует обязательный параметр categoryId')
                }
                newTree = newTree.map((item, id) => {
                    if (id === sectionId) {
                        return {
                            ...item,
                            categories: item.categories.map((itemCategory, idCategory) => {
                                if (idCategory === categoryId) {
                                    return {
                                        ...itemCategory,
                                        title: value
                                    }
                                }
                                return itemCategory
                            })
                        }
                    }
                })
            } catch (err) {
                console.error(err);
            }
        } else if (type === 'element') {
            try {
                if (typeof sectionId === 'undefined') {
                    throw new Error('Отсутствует обязательный параметр sectionId')
                }
                if (typeof categoryId === 'undefined') {
                    throw new Error('Отсутствует обязательный параметр categoryId')
                }
                if (typeof elementId === 'undefined') {
                    throw new Error('Отсутствует обязательный параметр elementId')
                }
                newTree = newTree.map((item, id) => {
                    if (id === sectionId) {
                        return {
                            ...item,
                            categories: item.categories.map((itemCategory, idCategory) => {
                                return {
                                    ...itemCategory,
                                    elements: itemCategory.elements.map((itemElement, idElement) => {
                                        if (idElement === elementId) {
                                            return {
                                                ...itemElement,
                                                title: value
                                            }
                                        }
                                        return itemElement
                                    })
                                }
                            })
                        }
                    }
                })
            } catch (err) {
                console.error(err);
            }
        }
        editTree(newTree);
    }

    function addElement(type: string, sectionId?: number, categoryId?: number) {
        let newTree: Array<Tree> = [...tree];
        if (type === 'section') {
            newTree.push({
                title: '',
                categories: [
                    {
                        title: '',
                        elements: [
                            {
                                title: '',
                            },
                        ]
                    }
                ]
            });
        } else if (type === 'category') {
            newTree[sectionId].categories.push({
                title: '',
                elements: [
                    {
                        title: '',
                    },
                ]
            });
        } else if (type === 'element') {
            try {
                if (typeof categoryId === 'undefined') {
                    throw new Error('Отсутствует обязательный параметр categoryId')
                }
                newTree[sectionId].categories[categoryId].elements.push({
                    title: '',
                })
            } catch (err) {
                console.error(err);
            }
        }
        editTree(newTree);
    }

    function removeElement(type: string, sectionId?: number, categoryId?: number) {
        let newTree: Array<Tree> = [...tree]
        if (type === 'section') {
            newTree.splice(-1, 1);
        } else if (type === 'category') {
            newTree[sectionId].categories.splice(-1, 1);
        } else if (type === 'element') {
            try {
                if (typeof categoryId === 'undefined') {
                    throw new Error('Отсутствует обязательный параметр categoryId')
                }
                newTree[sectionId].categories[categoryId].elements.splice(-1, 1);
            } catch (err) {
                console.error(err);
            }
        }
        editTree(newTree);
    }

    function addNewThree(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setNewTree(tree);
    }

    const sections = dashboardData.map((section: Section, sectionId: number) => {
        return (
            <div className="dashboard__section" key={sectionId}>
                <span className="dashboard__section-name">{section.title}</span>
                {section.categories.map((category: Category, categoryId: number) => {
                    return (
                        <div className="dashboard__category" key={categoryId}>
                            <span className="dashboard__category-name">{category.title}</span>
                            {category.elements.map((element: Element, elementId: number) => {
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
                    <div className="dashboard__form-tools">
                        <span className={`dashboard__form-icon dashboard__form-icon_add ${tree.length >= 3 ? 'dashboard__form-icon_disabled' : ''}`} onClick={(e: SyntheticEvent) => addElement('section')}></span>
                        <span className={`dashboard__form-icon dashboard__form-icon_remove ${tree.length <= 1 ? 'dashboard__form-icon_disabled' : ''}`} onClick={(e: SyntheticEvent) => removeElement('section', sectionId)}></span>
                    </div>

                    <label htmlFor="" className="dashboard__label">
                        <input type="text" value={section.title} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue('section', e.currentTarget.value, sectionId)} placeholder="Введите название раздела" />
                    </label>
                </div>
                {section.categories.map((category: Category, categoryId: number) => {
                    return (
                        <React.Fragment key={categoryId}>
                            <div className="dashboard__form-block dashboard__form-block_category">
                                <div className="dashboard__form-tools">
                                    <span className={`dashboard__form-icon dashboard__form-icon_add ${tree[sectionId].categories.length >= 3 ? 'dashboard__form-icon_disabled' : ''}`} onClick={(e: SyntheticEvent) => addElement('category', sectionId)}></span>
                                    <span className={`dashboard__form-icon dashboard__form-icon_remove ${tree[sectionId].categories.length <= 1 ? 'dashboard__form-icon_disabled' : ''}`} onClick={(e: SyntheticEvent) => removeElement('category', sectionId)}></span>
                                </div>
                                <label htmlFor="" className="dashboard__label">
                                    <input type="text" value={category.title} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue('category', e.currentTarget.value, sectionId, categoryId)} placeholder="Введите название категории" />
                                </label>
                            </div>
                            {category.elements.map((element: Element, elementId: number) => {
                                return (
                                    <div className="dashboard__form-block dashboard__form-block_element" key={elementId}>
                                        <div className="dashboard__form-tools">
                                            <span className={`dashboard__form-icon dashboard__form-icon_add ${tree[sectionId].categories[categoryId].elements.length >= 3 ? 'dashboard__form-icon_disabled' : ''}`} onClick={(e: SyntheticEvent) => addElement('element', sectionId, categoryId)}></span>
                                            <span className={`dashboard__form-icon dashboard__form-icon_remove ${tree[sectionId].categories[categoryId].elements.length <= 1 ? 'dashboard__form-icon_disabled' : ''}`} onClick={(e: SyntheticEvent) => removeElement('category', sectionId, categoryId)}></span>
                                        </div>
                                        <label htmlFor="" className="dashboard__label">
                                            <input type="text" value={element.title} className="dashboard__input" onChange={(e: React.FormEvent<HTMLInputElement>) => changeElementValue('element', e.currentTarget.value, sectionId, categoryId, elementId)} placeholder="Введите название элемента" />
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
                            {(sections && sections.length) ? sections : (<div className="dashboard__empty">
                                <h2>Пока что элеметов нет!</h2>
                            </div>)}
                        </div>
                        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => addNewThree(e)} className={`dashboard__form ${isActiveForm ? 'dashboard__form_active' : ''}`}>
                            {createTree.length ? createTree : null}
                            <button type="submit" disabled={tree.some(section => section.title.length ? false : true)} className="dashboard__form-submit">Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state: StateProps) => {
    return {
        dashboardData: state.dashboard
    }
};

const mapDispatchToProps = (dispatch: Function) => ({
    setNewTree(newTreeElement: Object) {
        dispatch(setNewTree(newTreeElement));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
