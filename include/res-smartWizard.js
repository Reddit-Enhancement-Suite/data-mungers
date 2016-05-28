$(document).ready(function(){
    // Smart Wizard
    $('#wizard').smartWizard({
        onLeaveStep: onLeaveStep,
        includeFinishButton: false
    });

    function onLeaveStep(obj){
        var stage = obj.attr('rel');
        var handler = leaveStepHandlers[stage];
        var result = true;
        if (handler) {
            result = handler();
        }
        if (result !== true) {
            alert(result || 'You\'re not done with this step yet.');
            return false;
        }
        return result;
    }

    var leaveStepHandlers = {};
    leaveStepHandlers[window.mungeStage || 2] = function() {
        var source = document.querySelector('#source').value;
        if (!source) {
            return 'Put the data in the text box.';
        }
        var result = munge(source);
        document.querySelector('#result').value = result;
        return true;
    }
});
