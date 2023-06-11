# Slot-machine game using react native

## Development

```npx react-native run-ios```
```npx react-native run-android```
```npx react-native run-ios --configuration Release```
```npx react-native run-android --variant=release```

## Build

```npm run build-android-debug```
```npm run build-android-release```

## Todo

1. Automate Releases
   1. create first release
   2. config [release tool](https://github.com/marketplace/actions/automatic-releases)
2. Settings button top left
   1. Add Settings Screen
3. Info (Payout Table) button top right
   1. Add Info Screen (Payout Table)
4. Add Credit Buy Screen
   1. click the credit button to open screen
   2. Save Credit Accross Play Sessions
5. Sound Effects
   1. if win with a character, play the character sound
   2. jackpot sound
   3. credit insert sound
6. Auto Spin
   1. Add Auto Spin button
   2. Turn into Stop button during auto spin
7. Free Spins
   1. Change the background color during free spins
   2. Auto Spin during free spins
   3. 3x multiplier during free spins
8. Second attempt at aesthetics
9.  Add tests for payline logic
    1. Config Jest
10. Add Wildcard Logic to payouts
