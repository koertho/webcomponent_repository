var extract = function (s, callback)
{
	var mode_normal = 0;
	var mode_comment = 1; // /* */
	var mode_lcomment = 2; // // \n
	var mode_dquote = 3; // ""
	var mode_squote = 4; // ''

	
	
	//Aufruf der Polymer-Funktion suchen
	var offset = s.search("Polymer");
	
	//Werte intialisieren
	var mode = mode_normal;
	var brack_count = 1;
	var pos = offset;
	
	//Zeiger auf Liste rücken
	while (s[pos] != "(") pos++;
		pos++; //Start nach Klammer
		
	//String durchlaufen, bis Polymer-Aufruf abgeschlossen
	while(brack_count > 0 && (pos < s.length) )
	{
		switch(mode)
		{
			case mode_normal:
				if (s[pos] == '(') 
		 			brack_count++;
		 		else if (s[pos] == ')') 
		 			brack_count--;	 		
				else if ((s[pos-1]=='/') && (s[pos] == '*')) 
					mode = mode_comment;
				else if ((s[pos-1]=='/') && (s[pos] == '/')) 
					mode = mode_lcomment;
				else if (s[pos]=='"')
					mode = mode_dquote;
				else if (s[pos]=="'")
					mode = mode_squote;
				break;
			case mode_comment:
				if ((s[pos-1]=='*') && (s[pos] == '/')) mode=mode_normal;
				break;
			case mode_lcomment:
				if (s[pos] == '\n') mode=mode_normal;
				break;
			case mode_dquote:
				if ((s[pos-1]!='\\') && (s[pos] == '"')) mode=mode_normal;
				break;
			case mode_squote: 
				if ((s[pos-1]!='\\') && (s[pos] == "'")) mode=mode_normal;
				break;
		}
	 	pos++;
	}

	//String anhand Ergebniss beschneiden
	s = s.substring(offset, pos);

	//Polymerfunktion für eval()
	function Polymer(o) { return o; }
	
	//Liste zurückgeben
	var result =  eval(s);
	return callback(null, result);
}

module.exports = extract;