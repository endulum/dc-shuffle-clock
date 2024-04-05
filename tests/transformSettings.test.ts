import transformSettings from '../src/helpers/transformSettings.ts'
import defaultSettings from '../src/helpers/defaultSettings.ts'

describe('transforming unknown data into usable clock settings', () => {
  it('should return all defaults if data is null or not an object', () => {
    expect(transformSettings(null)).toEqual(defaultSettings)
    expect(transformSettings(undefined)).toEqual(defaultSettings)
    expect(transformSettings('beep')).toEqual(defaultSettings)
  })

  it('should return no property that isn\'t included in the clock settings', () => {
    expect(transformSettings({ beep: 'boop' })).not.toHaveProperty('beep')
  })

  it('should preserve properties that are valid as clock settings', () => {
    expect(transformSettings(
      { delay: 10 }
    )).toEqual(
      { ...defaultSettings, delay: 10 }
    )

    expect(transformSettings(
      { soundSelect: 'SMS Alert 0' }
    )).toEqual(
      { ...defaultSettings, soundSelect: 'SMS Alert 0' }
    )

    expect(transformSettings(
      { notifsEnabled: true }
    )).toEqual(
      { ...defaultSettings, notifsEnabled: true }
    )

    const allChangedSettings = {
      delay: 20,
      soundEnabled: true,
      soundSelect: 'Nonexistent Track',
      soundVolume: 100,
      notifsEnabled: true,
      biomeEnabled: true,
      biomeSelect: '1',
      biomeOpenType: 'tab',
      notifAutoDismiss: true
    }

    expect(transformSettings(allChangedSettings)).toEqual(allChangedSettings)
  })

  it('should set settings with incorrect types to default', () => {
    expect(transformSettings(
      { delay: 'owowo', soundEnabled: true, notifsEnabled: 'uwuwu', biomeOpenType: 'tab' }
    )).toEqual(
      { ...defaultSettings, soundEnabled: true, biomeOpenType: 'tab' }
    )
  })
})
