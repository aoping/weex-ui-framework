/**
 * Created by dengjingwen on 17/7/3.
 */

import {adaptDate, currencyInt} from '../../../src/filters'

describe('filter', () => {
  it('filter adaptDate', () => {
    expect(adaptDate('2016-10-11', 'm', 'EN')).to.equal('Oct')
    expect(adaptDate('2016-10-11', 'd', 'EN')).to.equal('11')
    expect(adaptDate('2016-10-11', 'm', 'ZH')).to.equal('10月')
    expect(adaptDate('2016-10-11', 'd', 'ZH')).to.equal('11')
  })
  it('filter currencyInt', () => {
    expect(currencyInt('1599')).to.equal(' 1,599')
    expect(currencyInt('1599124')).to.equal(' 1,599,124')
  })
})
