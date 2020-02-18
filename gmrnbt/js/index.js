import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView
} from 'react-native'
import _ from 'underscore'
import GMBluetooth from 'react-native-gm-bluetooth'

const { ESC, TSC } = GMBluetooth

const logError = reason => console.warn('promise error:', reason)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      devices: [],
      connectedID: null,
      weight: null
    }
    this.handleConnect = this.handleConnect.bind(this)
  }

  initListener () {
    // 监听是否断开
    GMBluetooth.on('connectionLost', () => {
      this.setState({
        connectedID: null
      })
    })

    // 不详细写了， 见https://github.com/rusel1989/react-native-bluetooth-serial
    GMBluetooth.on('bluetoothEnabled', () => {
      console.log('bluetoothEnabled')
    })
    GMBluetooth.on('bluetoothDisabled', () => {
      console.log('bluetoothDisabled')
    })
    GMBluetooth.on('connectionSuccess', () => {
      console.log('connectionSuccess')
    })
    GMBluetooth.on('connectionFailed', () => {
      console.log('connectionFailed')
    })
    GMBluetooth.on('error', () => {
      console.log('error')
    })

    GMBluetooth.withDelimiter('=')
    GMBluetooth.on('read', (obj) => {
      if (obj && obj.data) {
        let weight = obj.data.replace('=', '').split('').reverse().join('')
        weight = Number(weight)
        if (weight !== this.state.weight) {
          this.setState({
            weight
          })
        }
      }
    })
  }

  componentDidMount () {
    // 判断蓝牙是否可用
    GMBluetooth.isEnabled().then(result => {
      this.setState({
        isEnabled: result
      })
    }).catch(logError)

    // 列出已配对的设备列表
    GMBluetooth.list().then(devices => {
      console.log('GMBluetooth list:', devices)
      this.setState({
        devices
      })
    }).catch(logError)
  }

  componentDidUnMount () {
    GMBluetooth.disconnect()
  }

  handleConnect (device) {

    GMBluetooth.isConnected().then(isConnected => {
      if (isConnected) {
        console.log('已连接')
      } else {
        GMBluetooth.connect(device.id).then(info => {
          console.log('GMBluetooth connect to ' + device.id, info)
          this.setState({
            connectedID: device.id
          })
        }).catch(reason => {
          this.setState({
            connectedID: null,
            weight: null
          })
          logError(reason)
        })
      }
    })
  }

  print () {
    // 一定要配置好
    const Config = {
      wordNumber: 48
    }
    ESC.setConfig(Config)

    ESC.init()
    ESC.alignCenter()
    ESC.fontBold()
    ESC.printAndNewLine()
    ESC.text('正定新区许翠蔬菜店')
    ESC.printAndNewLine()

    ESC.text('采购订货单')
    ESC.printAndNewLine()

    ESC.printAndNewLine()

    ESC.init()
    ESC.text('下单时间：2016-09-06 19:30:23')
    ESC.printAndNewLine()
    ESC.text('单据编号：T2345-CGD-2017-01-14-00005')
    ESC.printAndNewLine()
    ESC.text('采购单位：小农女供应链优先公司')
    ESC.printAndNewLine()
    ESC.text('采购经办：采购员A')
    ESC.printAndNewLine()
    ESC.text('电    话：15201083760')
    ESC.printAndNewLine()
    ESC.printAndNewLine()

    ESC.text('商品明细：共2种商品')
    ESC.printAndNewLine()

    // 商品开始
    ESC.text(
      ESC.Util.leftRight('大利(42斤/件)', '', 20)
      + ESC.Util.leftRight('84元/件', '', 11)
      + ESC.Util.leftRight('x1件', '总价：84元', 17)
    )
    ESC.printAndNewLine()
    ESC.text(' （3斤,1斤/斤,要新鲜的）+（5袋,5斤/袋,不要睡分太多的）')
    ESC.printAndNewLine()
    ESC.text(_.times(Config.wordNumber, () => '-').join(''))
    ESC.printAndNewLine()
    // 商品结束

    // 商品开始
    ESC.text(
      ESC.Util.leftRight('大利(42斤/件)', '', 20)
      + ESC.Util.leftRight('84元/件', '', 11)
      + ESC.Util.leftRight('x1件', '总价：84元', 17)
    )
    ESC.printAndNewLine()
    ESC.text(' （3斤,1斤/斤,要新鲜的）+（5袋,5斤/袋,不要睡分太多的）')
    ESC.printAndNewLine()
    ESC.text(_.times(Config.wordNumber, () => '-').join(''))
    ESC.printAndNewLine()
    // 商品结束

    ESC.text(_.times(Config.wordNumber, () => '-').join(''))
    ESC.printAndNewLine()
    ESC.alignRight()
    ESC.text('合计：168元')
    ESC.printAndNewLine()

    ESC.printAndNewLine()
    ESC.printAndNewLine()

    ESC.init()
    ESC.text(ESC.Util.leftRight('采购经办：', '', 24) + '供应商：')
    ESC.printAndNewLine()

    ESC.printAndNewLine()
    ESC.printAndNewLine()
    ESC.printAndNewLine()
    ESC.printAndNewLine()
    ESC.printAndNewLine()
    ESC.printAndNewLine()

    ESC.sound()
    ESC.init()
  }

  printLabel () {
    // 一定要配置好
    TSC.config({
      width: 60,
      height: 40,
      gap: 1,
      direction: 0,
      referenceX: 30,
      referenceY: 32
    })

    // 正常一个字是24*24，英文 12*24。 自己算吧

    TSC.init()
    TSC.text(0, 0, '打印日期:2016-02-23')
    TSC.text(240, 0, '标签编号:2222')

    TSC.text(0, 40, '菜心', 3, 3)

    TSC.text(0, 130, '品质:大条', 1, 2)
    TSC.text(240, 130, '级别:A级', 1, 2)

    TSC.text(0, 180, '规格:30斤/盒', 1, 2)
    TSC.text(240, 180, '产区:4区3片', 1, 2)

    TSC.text(0, 250, '分拣工:张三')
    TSC.text(200, 250, '验收人:李四')
    TSC.print()
    TSC.sound()
  }

  render () {
    const { isEnabled, devices, connectedID, weight } = this.state

    return (
      < View
    style = {
    {
      flex: 1
    }
  }>
  <
    ScrollView
    style = {
    {
      flex: 1
    }
  }>
  <
    Text > 蓝牙是否可用
  :
    {isEnabled ? 'true' : 'false'}
  <
    /Text>

    < Text > ------------------------ < /Text>

    < Text > 已配对蓝牙列表（点击可连接）<
    /Text>
    {
      _.map(devices, device => (
        < Text
      style = {
      {
        borderColor: 'grey',
          padding
      :
        10,
          margin
      :
        5,
          borderWidth
      :
        1
      }
    }
      key = { device.id }
      onPress = { this.handleConnect.bind(this, device) }
      > { device.name } | { device.id }
      | {(device.id === connectedID) ? 'connected' : ''
    }<
      /Text>
    ))
    }

  <
    Text > ------------------------------------------------ < /Text>

    < Text
    style = {
    {
      padding: 10,
        margin
    :
      5
    }
  }>
    电子秤数： {weight}
  <
    /Text>

    < Text > ------------------------------------------------ < /Text>

    < Text
    style = {
    {
      borderColor: 'grey',
        padding
    :
      10,
        margin
    :
      5,
        borderWidth
    :
      1
    }
  }
    onPress = { this.print } > test
    print
    小票 < /Text>
    < Text
    style = {
    {
      borderColor: 'grey',
        padding
    :
      10,
        margin
    :
      5,
        borderWidth
    :
      1
    }
  }
    onPress = { this.printLabel } > test
    print
    标签 < /Text>
    < /ScrollView>
    < /View>
  )

  }
}

export default App
