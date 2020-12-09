const cooldowns = {
  
}
function setCooldown(id,time) {
  cooldowns[id] = true
  setTimeout(()=>cooldowns[id] = false,time)
}
function checkCooldown(id) {
  if(!cooldowns.hasOwnProperty(id)) {
    return false
  } 
  return cooldowns[id]
}
/* we can talk like this lol instead of discord each line is you then me lol
wait what next? what's the cooldown times? // okie dokie
add the cooldown to all the clickables. The cooldown time is 0.5 seconds?
*/