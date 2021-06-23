import 'regenerator-runtime/runtime'
import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import PaymentForm from '../src/components/PaymentForm'
import modal from '../src/plugins/ModalWindows/index'


const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(modal)

describe ('PaymentForm', () => {
    let actions
    let getters
    let store

    const $route = {
        name: 'MyCosts',
        path: '/',
        params: {}
    }

    beforeEach(() => {
        actions = {
            getCategories: jest.fn(), 
            addItem: jest.fn(),
            updItem: jest.fn()
        }

        getters = {
            categories: () => ['Food', 'Sport'],
            paymentsList: () => [{id:1, date: '17-06-2021', category:'Sport', value: 300}],
            itemsOnPage: () => 3
        }

        store = new Vuex.Store({
            actions,
            getters
        })
    })
    
    test('Добавляет новую запись', () => {
        const wrapper = mount (PaymentForm, { 
            store, 
            localVue, 
            stubs: ['router-link'],
            mocks: { $route } 
        })
        wrapper.setData({
            date: '26.05.2020',
            category: 'Food',
            value: 250
        })
        wrapper.find('button[name="save"]').trigger('click')
        expect(actions.addItem).toHaveBeenCalled()
    })

    test('Обновляет существующую запись', () => {
        const wrapper = mount (PaymentForm, { 
            store, 
            localVue, 
            stubs: ['router-link'],
            mocks: { $route } 
        })
        const settings = {
            id: 1,
            date: '26.05.2020',
            category: 'Food',
            value: 250
        }
        wrapper.vm.init({settings})
        wrapper.find('button[name="save"]').trigger('click')
         expect(actions.updItem).toHaveBeenCalled()
    })
    
    test('Заполняет поля параметрами из ссылки', () => {
        const wrapper = mount (PaymentForm, { 
            store, 
            localVue, 
            stubs: ['router-link'],
            mocks: { $route } 
        })
        const settings = {
          date: '17-06-2021',
          category: 'Food'
        }
        wrapper.vm.init({settings})
        expect(wrapper.vm.date).toEqual('17-06-2021')
        expect(wrapper.vm.category).toEqual('Food')
    })

    test('Добавляет запись с переданными параметрами', () => {
        const wrapper = mount (PaymentForm, { 
            store, 
            localVue, 
            stubs: ['router-link'],
            mocks: { $route } 
        })
        const settings = {
        //   date: '23-06-2021',
          category: 'Food',
          value: 200
        }
        wrapper.vm.init({settings})
        // expect(wrapper.vm.date).toEqual('23-06-2021')
        expect(wrapper.vm.category).toEqual('Food')
        expect(wrapper.vm.value).toBe(200)
        expect(actions.addItem).toHaveBeenCalled()

    })

    test('Сбрасывает значения полей', () => {
        const wrapper = mount(PaymentForm, {
            stubs: ['router-link'], 
            store, 
            localVue 
        })
        wrapper.setData({
          date: '26.05.2020',
          category: 'Food',
          value: 250
        })
    
        const saveBTN = wrapper.find('button')
        saveBTN.trigger('click')

        expect(wrapper.vm.date).toEqual('')
        expect(wrapper.vm.category).toEqual('')
        expect(wrapper.vm.value).toBe('')
        
    })
})